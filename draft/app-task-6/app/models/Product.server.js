import db from "../db.server";
import {
  getPricingRule,
  getPricingRulesByScopeType,
} from "./PricingRule.server";

export async function getAllProducts(graphql) {
  const response = await graphql(`
    query getAllProducts {
      products(first: 100) {
        edges {
          node {
            id
            title
            vendor
            status
            tags
            variants(first: 10) {
              nodes {
                id
                title
                price
              }
            }
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
        }
      }
    }
  `);

  const {
    data: { products },
  } = await response.json();
  const result = products.edges.map((edge) => {
    const { node } = edge;
    const { id, title, vendor, status, tags } = node;
    const collections = node.collections.nodes;
    const images = node.images.nodes;
    const variants = node.variants.nodes;
    return { id, title, vendor, status, tags, variants, collections, images };
  });

  return result;
}
export async function getALLPricingRuleProducts(products) {
  let result = [];
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    const { pricingRules, scopeLists } =
      await getALLPricingRuleperProduct(product);
    result.push({ ...product, pricingRules, scopeLists });
  }
  return result;
}

export async function getALLPricingRuleperProduct(product) {
  let scopeListperProduct = [];

  // get scopeLists by id
  const productId = product.id;
  let scopeListsfromProductId = await getScopeListsfromProductId(productId);
  scopeListperProduct = [...scopeListperProduct, ...scopeListsfromProductId];
  // handle tag
  const { tags } = product;
  for (let j = 0; j < tags.length; j++) {
    let tag = tags[j];

    let scopeListfromTagType = await getScopeListsfromTagType(tag);
    if (
      !checkExistedScopeList({
        existedList: scopeListperProduct,
        newScope: scopeListfromTagType,
      })
    ) {
      scopeListperProduct = [...scopeListperProduct, ...scopeListfromTagType];
    }
  }
  //handle collection
  const { collections } = product;
  for (let j = 0; j < collections.length; j++) {
    let collection = collections[j];

    let scopeListsfromCollectionType = await getScopeListsfromCollectionType(
      collection.id,
    );
    if (
      !checkExistedScopeList({
        existedList: scopeListperProduct,
        newScope: scopeListsfromCollectionType,
      })
    ) {
      scopeListperProduct = [
        ...scopeListperProduct,
        ...scopeListsfromCollectionType,
      ];
    }
  }
  // get pricing rules apply for all products
  const ruleforAll = await getPricingRulesByScopeType("all");
  // get pricing rule by list scopeList above
  let pricingRulesperProduct = [...ruleforAll];

  for (let i = 0; i < scopeListperProduct.length; i++) {
    let { pricingRuleId } = scopeListperProduct[i];
    let pricingRule = await getPricingRule(pricingRuleId);
    pricingRulesperProduct.push(pricingRule);
  }

  return {
    pricingRules: pricingRulesperProduct,
    scopeLists: scopeListperProduct,
  };
}

function checkExistedScopeList({ existedList, newScope }) {
  for (let i = 0; i < existedList.length; i++) {
    if (newScope.pricingRuleId == existedList[i].pricingRuleId) {
      return true;
    }
  }
  return false;
}

export async function getScopeListsfromProductId(productId) {
  const scopeLists = await db.scopeList.findMany({
    where: { value: productId },
  });

  return scopeLists;
}

export async function getScopeListsfromCollectionType(collectionId) {
  const scopeLists = await db.scopeList.findMany({
    where: { value: collectionId },
  });
  return scopeLists;
}

export async function getScopeListsfromTagType(tag) {
  const scopeLists = await db.scopeList.findMany({
    where: { value: tag },
  });
  return scopeLists;
}
