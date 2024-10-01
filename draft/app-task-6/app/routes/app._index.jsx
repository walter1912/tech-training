import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { Layout, Page } from "@shopify/polaris";

import {
  getAllProducts,
} from "../models/Product.server";
import ProductsTable from "./components/ProductsTable";
import { useCallback } from "react";

export async function loader({ request }) {
  const { admin } = await authenticate.admin(request);
  // const pricingRules = await getPricingRules(session.shop, admin.graphql);
  const products = await getAllProducts(admin.graphql);
  // const aLLPricingRuleProducts = await getALLPricingRuleProducts(products);
  return json({
    // pricingRules,
    products
    // aLLPricingRuleProducts,
  });
}

export default function Index() {
  const { products } = useLoaderData();

  const navigate = useNavigate();
  const navigateToCreate = useCallback(() => {
    navigate("/app/pricingRules/new");
  }, []);
  return (
    <Page>
      <ui-title-bar title="App">
        <button type="primary" onClick={() => navigateToCreate()}>Create new Pricing Rule</button>
      </ui-title-bar>
      <Layout>
        <h1>List Products</h1>
        <ProductsTable products={products} />
      </Layout>
    </Page>
  );
}
