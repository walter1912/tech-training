import { Text } from "@shopify/polaris";
import React from "react";

export default function CustomHeader({ text }) {
  return (
    <Text variant="headingMd" as="h4">
      {text}
    </Text>
  );
}
