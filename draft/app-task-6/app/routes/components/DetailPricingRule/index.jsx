import React from "react";
/*
percent amount fixed
*/
import ProductsTable from "../ProductsTable";
export default function DetailPricingRule({ products, pricingRule }) {
  const { customPrice, customPriceType } = pricingRule;
  let afterDiscount = 0;
  const productPrice = products.map((product) => {
    const oldPrice = Number(product.variants[0].price);
    if (customPriceType === "fixed") {
      afterDiscount = customPrice;
    }
    if (customPriceType === "amount") {
      afterDiscount = oldPrice - Number(customPrice);
    }
    if (customPriceType === "percent") {
      afterDiscount = (oldPrice * (100 - Number(customPrice))) / 100;
    }

    return { ...product, afterDiscount };
  });
  return (
    <div>
      <h1>Show product pricing details </h1>
      <ProductsTable products={productPrice} isPricingRule={true} />
    </div>
  );
}
