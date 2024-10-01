export function getNumberIdProduct(id) {
  const array = id.split("/");
  return array[array.length - 1];
}

export function concatIdProduct(numberId) {
  return `gid://shopify/Product/` + numberId;
}
