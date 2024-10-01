
export function checkMinusPrice({
    customPriceType,
    customPrice,
    scopeListFull,
    scopeType,
  }) {
    // check case percent
    let result = {};
    if (customPriceType === "percent") {
      if (customPrice >= 100) {
        result.error = "Discount percent must be less than 100%";
      }
    }
    if (
      (customPriceType === "productScope" || scopeType === "all") &&
      customPriceType === "amount"
    ) {
      let minPrice = 100000;
      let listMinPrices = scopeListFull.map((product) => {
        const { variants } = product;
        let price = Number(variants[0].price);
        if (price < minPrice) minPrice = price;
        return price;
      });
      result.minPrice = minPrice;
      if (minPrice <= customPrice) {
        result.error = `Discount amount is more bigger than some products, you must discount max is ${minPrice}$`;
      }
    }
    return result;
  }