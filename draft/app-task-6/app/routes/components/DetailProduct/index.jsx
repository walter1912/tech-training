import {
  Page,
  Card,
  DataTable,
  Badge,
  Text,
  Thumbnail,
  BlockStack,
} from "@shopify/polaris";
import React from "react";
import CustomHeader from "../ProductsTable/CustomHeader";

function DetailProduct({ product }) {
  const { pricingRules } = product;
  const originalPrice = "101000";
  const productRow = [
    [
      <Thumbnail
        source={
          product.images.length > 0
            ? product.images[0].url
            : "https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
        }
        alt={product.images.length > 0 ? product.images[0].altText : "no image"}
      />,

      <p>{product.title}</p>,
      <Badge tone="success">{product.status}</Badge>,
      <div>
        {product.collections.length > 0 &&
          product.collections.map((collection) => (
            <p key={collection.id}>{collection.title}</p>
          ))}
      </div>,
      <div>
        {product.tags.length > 0 &&
          product.tags.map((tag, index) => <p key={index}>{tag}</p>)}
      </div>,
      <strong> {product.vendor}</strong>,
    ],
  ];
  const rows =
    pricingRules.length > 0
      ? pricingRules.map((rule) => {
          const { name, priority, status, customPriceType, customPrice } = rule;

          return [
            originalPrice,
            name,
            priority,
            <Badge tone={status === "enable" ? "enabled" : "read-only"}>
              {status}
            </Badge>,
            customPriceType,
            <Text tone="critical">{customPrice} </Text>,
          ];
        })
      : [["", "", "", "", "", ""]];

  return (
    <Page title={"Detail Product"}>
      <BlockStack gap={300}>
        <DataTable
          columnContentTypes={["text", "text", "text", "text", "text", "text"]}
          headings={[
            " ",
            <CustomHeader text="Title" />,
            <CustomHeader text="Status" />,
            <CustomHeader text="Tags" />,
            <CustomHeader text="Collections" />,
            <CustomHeader text="Vender" />,
          ]}
          rows={productRow}
          verticalAlign="middle"
        />
        <Text variant="headingLg" as="h4">
          List Pricing rules of this product {product.title}
        </Text>
        <Card>
          <DataTable
            columnContentTypes={[
              "text",
              "text",
              "text",
              "text",
              "text",
              "text",
            ]}
            headings={[
              <CustomHeader text="Original Cost" />,
              <CustomHeader text="Name of rule" />,
              <CustomHeader text="Priority" />,
              <CustomHeader text="Status" />,
              <CustomHeader text="Custom Price Type" />,
              <CustomHeader text="Custom Value" />,
            ]}
            rows={rows}
          />
        </Card>
      </BlockStack>
    </Page>
  );
}
export default DetailProduct;
