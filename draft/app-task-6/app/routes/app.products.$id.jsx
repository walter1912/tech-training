import React, { useCallback } from "react";
import { authenticate } from "../shopify.server";
import { getALLPricingRuleperProduct } from "../models/Product.server";
import { redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { concatIdProduct } from "../libs/handleString";
import { json } from "@remix-run/node";
import { Card, Page } from "@shopify/polaris";
import DetailProduct from "./components/DetailProduct";

export async function loader({ request, params }) {
  const { admin } = await authenticate.admin(request);
  if (params.id !== "") {
    const fullId = concatIdProduct(params.id);
    const response = await admin.graphql(
      `
            query getProduct($id: ID!) {
                product(id: $id) {
                    id
                    title
                    vendor
                    status
                    tags
                    collections(first: 10) {
                        nodes {
                            title
                            id
                        }
                    }
                    images(first: 10) {
                      nodes {
                        url
                        altText
                      }
                    }
                }
            }`,
      {
        variables: {
          id: fullId,
        },
      },
    );

    const {
      data: { product },
    } = await response.json();
    const { id, title, vendor, status, tags, images } = product;
    const collections = product.collections.nodes;
    const newProduct = { id, title, vendor, status, tags, collections, images };
    const { pricingRules, scopeLists } =
      await getALLPricingRuleperProduct(newProduct);
    return json({
      product: { ...newProduct, pricingRules, scopeLists },
      pricingRules,
      scopeLists,
    });
  }
}
export default function ProductDetail(props) {
  const { product } = useLoaderData();
  const navigate = useNavigate();
  const redirectToHome = useCallback(() => {
    navigate("/app");
  }, []);
  const navigateToCreate = useCallback(() => {
    navigate("/app/pricingRules/new");
  }, []);
  return (
    <Page>
      <ui-title-bar title={"App"}>
        <button variant="breadcrumb" onClick={redirectToHome}>
          All products
        </button>
        <button onClick={() => navigateToCreate()}>
          Create new Pricing Rule
        </button>
      </ui-title-bar>
      <Card>
        <DetailProduct product={product} />
      </Card>
    </Page>
  );
}
