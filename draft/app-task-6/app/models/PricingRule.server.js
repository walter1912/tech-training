import db from "../db.server";
import { STATUS } from "./default-constant";

export async function getPricingRule(id) {
  const pricingRule = await db.pricingRule.findFirst({
    where: { id },
  });

  if (!pricingRule) {
    return {};
  }

  return pricingRule;
}
export async function getPricingRulesByScopeType(scope) {
  const pricingRules = await db.pricingRule.findMany({
    where: {
      scopeType: scope,
    },
  });
  if (!pricingRules) {
    return null;
  }
  return pricingRules;
}
export async function getPricingRules(shop, graphql) {
  const pricingRules = await db.pricingRule.findMany({
    where: { shop },
    orderBy: { id: "desc" },
  });

  if (pricingRules.length === 0) return [];

  return Promise.all(
    pricingRules.map((pricingRule) =>
      supplementPricingRule(pricingRule, graphql),
    ),
  );
}

async function supplementPricingRule(pricingRule, graphql) {
  const scopeList = await db.scopeList.findMany({
    where: { pricingRuleId: pricingRule.id },
    orderBy: { id: "desc" },
  });

  let listProducts = [];
  if (pricingRule.scopeType === "productScope") {
    for (let i = 0; i < scopeList.length; i++) {
      let productId = scopeList[i].value;
      const response = await graphql(
        `
          query supplementPricingRule($id: ID!) {
            product(id: $id) {
              title
              images(first: 1) {
                nodes {
                  altText
                  url
                }
              }
            }
          }
        `,
        {
          variables: {
            id: productId,
          },
        },
      );

      const {
        data: { product },
      } = await response.json();
      listProducts.push(product);
    }
  }

  return {
    ...pricingRule,
    scopeList: listProducts,
  };
}

export function validatePricingRule(data) {
  const errors = {};

  if (!data.name) {
    errors.name = "Name is required";
  }

  if (data.priority < 0 || data.priority > 99) {
    errors.priority = "Priority is required from 0 to 99";
  }

  if (!data.status) {
    errors.status = "Status is required";
  } else {
    if (!Object.values(STATUS).includes(data.status)) {
      errors.status = `You must choose ${Object.values(STATUS).join(", ")}`;
    }
  }
  if (!data.scopeType) {
    errors.scopeType = "scopeType is required";
  }
  if (!data.customPriceType) {
    errors.customPriceType = "Custom Price Type is required";
  }
  if (!data.customPrice) {
    errors.customPrice = "Custom Price Value is required";
  }

  if (Object.keys(errors).length) {
    return errors;
  }
}
