export const statusOptions = [
  { label: "Enable", value: "Enable" },
  { label: "Disable", value: "Disable" },
];

export const scopeTypeRange = [
  { label: "All products", value: "all" },
  { label: "Specific products", value: "productScope" },
  { label: "Product collections", value: "collectionScope" },
  { label: "Product tags", value: "tagScope" },
];

export const customPriceTypeRange = [
  { label: "Apply price to selected products", value: "fixed" },
  {
    label:
      "Decrease a fixed amount of the original prices of selected products",
    value: "amount",
  },
  {
    label:
      "Decrease the original prices of selected products by a percentage (%)",
    value: "percent",
  },
];

export const STATUS = {
  ENABLE: "Enable",
  DISABLE: "Disable",
};
