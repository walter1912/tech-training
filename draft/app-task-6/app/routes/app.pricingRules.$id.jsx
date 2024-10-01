import { useCallback, useState } from "react";
import { json, redirect } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
  useNavigate,
} from "@remix-run/react";
import { authenticate } from "../shopify.server";
import {
  Card,
  ChoiceList,
  Layout,
  Page,
  Text,
  TextField,
  BlockStack,
  PageActions,
  Select,
} from "@shopify/polaris";
import RenderScopeList from "./components/CreatePricingRule/RenderScopeList";
import { checkMinusPrice } from "./components/CreatePricingRule/checkValidate";
import db from "../db.server";
import {
  getPricingRule,
  validatePricingRule,
} from "../models/PricingRule.server";

import {
  customPriceTypeRange,
  scopeTypeRange,
  statusOptions,
} from "../models/default-constant";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import ComboboxExample from "./components/ComboBox";
import { initPricingRule, initScopeList } from "../interfaces/index.ts";
import { getAllProducts } from "../models/Product.server";
import DetailPricingRule from "./components/DetailPricingRule";
import { setLocalStorage, getLocalStorage } from "../libs/localStorage";

export async function loader({ request, params }) {
  const { admin } = await authenticate.admin(request);
  let pricingRule = initPricingRule;
  const allProducts = await getAllProducts(admin.graphql);

  if (params.id !== "new") {
    const existedPricingRule = await getPricingRule(
      Number(params.id),
      admin.graphql,
    );
    Object.keys(existedPricingRule).forEach((e) => {
      if (existedPricingRule[e] === null) {
        existedPricingRule[e] = "";
      }
    });
    return json({ pricingRule: existedPricingRule, allTags: [], allProducts });
  }
  const response = await admin.graphql(
    `
      query getAllTags {
        products(first: 250) {
          edges {
            node {
              tags
            }
          }
        }
      }
    `,
  );
  let allTags = [];
  const { data } = await response.json();

  let edge = data.products.edges;
  for (let i = 0; i < edge.length; i++) {
    let tag = edge[i].node.tags;
    for (let j = 0; j < tag.length; j++) {
      if (allTags.every((e) => e !== tag[j])) {
        allTags.push(tag[j]);
      }
    }
  }
  return json({ pricingRule, allTags, allProducts });
}

export async function action({ request, params }) {
  const { session } = await authenticate.admin(request);
  const { shop } = session;

  const form = Object.fromEntries(await request.formData());
  /** @type {any} */
  const dataRes = {
    ...form,
    shop,
  };
  let scopeList = JSON.parse(dataRes.scopeList || "[]");
  let scopeListFull = JSON.parse(dataRes.scopeListFull || "[]");

  const data = {
    name: dataRes.name,
    status: dataRes.status,
    scopeType: dataRes.scopeType,
    customPriceType: dataRes.customPriceType,
    shop: dataRes.shop,
    createAt: new Date(),
    priority: Number(dataRes.priority),
    customPrice: Number(dataRes.customPrice),
  };

  if (data.action === "delete") {
    await db.pricingRule.delete({ where: { id: Number(params.id) } });
    return redirect("/app");
  }

  const errors = validatePricingRule(data);

  const minusPrice = checkMinusPrice({
    customPriceType: data.customPriceType,
    customPrice: data.customPrice,
    scopeType: data.scopeType,
    scopeListFull,
  });

  if (errors) {
    return json({ errors }, { status: 422 });
  }
  if (minusPrice.error) {
    return json(
      {
        errors: {
          customPrice: minusPrice.error,
        },
      },
      { status: 422 },
    );
  }

  const pricingRule =
    params.id === "new"
      ? await db.pricingRule.create({ data })
      : await db.pricingRule.update({ where: { id: Number(params.id) }, data });
  const dataScopeList = scopeList.map((scope) => ({
    value: scope.value,
    pricingRuleId: pricingRule.id,
  }));
  dataScopeList.forEach(async (row) => {
    await db.scopeList.create({ data: row });
  });
  return redirect(`/app/pricingRules/${pricingRule.id}`);
}

export default function QRCodeForm() {
  const shopify = useAppBridge();
  const errors = useActionData()?.errors || {};

  const { pricingRule, allTags, allProducts } = useLoaderData();
  const [selectTag, setSelectTag] = useState([]);
  const [formState, setFormState] = useState(pricingRule);
  const [scopeList, setScopeList] = useState([initScopeList]);
  const [scopeListFull, setScopeListFull] = useState(
    getLocalStorage("scopeListFull") ? getLocalStorage("scopeListFull") : [],
  );
  const [cleanFormState, setCleanFormState] = useState(pricingRule);
  const isDirty = JSON.stringify(formState) !== JSON.stringify(cleanFormState);

  const nav = useNavigation();
  const isSaving =
    nav.state === "submitting" && nav.formData?.get("action") !== "delete";
  const isDeleting =
    nav.state === "submitting" && nav.formData?.get("action") === "delete";

  const navigate = useNavigate();

  async function selectScopeShopify(type = "product") {
    const response = await window.shopify.resourcePicker({
      type: type,
      action: "select", // customized action verb, either 'select' or 'add',
      multiple: true,
    });
    return response;
  }

  const submit = useSubmit();
  function handleSave() {
    setCleanFormState({ ...formState });
    let scope = [...scopeList];
    if (formState.scopeType === "tagScope") {
      scope = selectTag.map((t) => ({ value: t }));
    }
    const dataPricingRule = {
      ...formState,
      scopeList: JSON.stringify(scope),
      scopeListFull: JSON.stringify(scopeListFull),
    };
    setLocalStorage("scopeListFull", scopeListFull);
    submit(dataPricingRule, { method: "post" });
  }

  async function handleChoiceScopeType(scopeType) {
    if (scopeType != "all") {
      if (scopeType === "productScope") {
        const products = await selectScopeShopify("product");

        if (products) {
          setScopeList(products.map((p) => ({ value: p.id })));
          setScopeListFull(products);
        }
      }
      if (scopeType === "collectionScope") {
        const collections = await selectScopeShopify("collection");
        if (collections) {
          setScopeList(collections.map((p) => ({ value: p.id })));
          setScopeListFull(collections);
        }
      }
      if (scopeType === "tagScope") {
        shopify.modal.show("my-modal");
      }
    }

    if (scopeType === "all") {
      setScopeListFull(allProducts);
    }
  }
  const handleCloseSelectedTag = useCallback(() => {
    shopify.modal.hide("my-modal");
    setScopeListFull(selectTag);
  }, [selectTag]);
  return (
    <>
      <Page>
        <ui-title-bar
          title={
            pricingRule.id ? "Edit Pricing Rule" : "Create new Pricing Rule"
          }
        >
          <button variant="breadcrumb" onClick={() => navigate("/app")}>
            All products
          </button>
        </ui-title-bar>
        <Layout>
          <Layout.Section>
            <BlockStack gap="400">
              <Card>
                <Text as="h3" variant="headingMd">
                  General information
                </Text>
                <TextField
                  id="name"
                  label="Name"
                  value={formState.name}
                  onChange={(name) => setFormState({ ...formState, name })}
                  error={errors.name}
                />
                <TextField
                  type="number"
                  id="priority"
                  label="Priority"
                  value={formState.priority}
                  onChange={(priority) =>
                    setFormState({ ...formState, priority })
                  }
                  error={errors.priority}
                  helpText="Please enter an integer from 0 to 99. 0 is the highest priority."
                />
                <Select
                  label="Status"
                  placeholder="Select status"
                  options={statusOptions}
                  onChange={(status) => setFormState({ ...formState, status })}
                  value={formState.status}
                  error={errors.status}
                />
              </Card>
              <Card>
                <Text as="h3" variant="headingMd">
                  Apply to Products
                </Text>
                <ChoiceList
                  title="scope Type Range"
                  titleHidden
                  choices={scopeTypeRange || []}
                  selected={formState?.scopeType}
                  onChange={(listChoose) => {
                    setFormState({
                      ...formState,
                      scopeType: listChoose[0],
                    });

                    handleChoiceScopeType(listChoose[0]);
                  }}
                  error={errors.scopeType}
                />
              </Card>
              <RenderScopeList
                scopeListFull={scopeListFull}
                scopeType={formState.scopeType}
              />

              <Card>
                <Text as="h3" variant="headingMd">
                  Custom Prices
                </Text>
                <ChoiceList
                  title="customPriceTypeRange"
                  titleHidden
                  choices={customPriceTypeRange}
                  selected={formState?.customPriceType}
                  onChange={(listChoose) =>
                    setFormState({
                      ...formState,
                      customPriceType: listChoose[0],
                    })
                  }
                  error={errors.customPriceType}
                />
                <TextField
                  type="number"
                  id="customPrice"
                  label="Amount"
                  value={formState.customPrice}
                  onChange={(customPrice) =>
                    setFormState({ ...formState, customPrice })
                  }
                  error={errors.customPrice}
                />
              </Card>
            </BlockStack>
          </Layout.Section>

          <Layout.Section>
            <PageActions
              secondaryActions={[
                {
                  content: "Delete",
                  loading: isDeleting,
                  disabled:
                    !pricingRule.id || !pricingRule || isSaving || isDeleting,
                  destructive: true,
                  outline: true,
                  onAction: () =>
                    submit({ action: "delete" }, { method: "post" }),
                },
              ]}
              primaryAction={{
                content: "Save",
                loading: isSaving,
                disabled: !isDirty || isSaving || isDeleting,
                onAction: handleSave,
              }}
            />
          </Layout.Section>
        </Layout>
        <Modal
          id="my-modal"
          variant="base"
          onShow={() => console.log("Modal is showing")}
        >
          <TitleBar title="Select tags">
            <button variant="primary" onClick={handleCloseSelectedTag}>
              Save
            </button>
            <button
              onClick={() => {
                shopify.modal.hide("my-modal");
              }}
            >
              Cancel
            </button>
          </TitleBar>
          <ComboboxExample
            allTags={allTags}
            setSelected={setSelectTag}
            selected={selectTag}
          />
        </Modal>

        {pricingRule.id ? (
          <DetailPricingRule
            products={scopeListFull}
            pricingRule={pricingRule}
          />
        ) : (
          <></>
        )}
      </Page>
    </>
  );
}
