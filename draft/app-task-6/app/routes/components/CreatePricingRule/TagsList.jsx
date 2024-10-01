import React from "react";
import { Card, Tag } from "@shopify/polaris";

export default function TagsList({ tags }) {
  return (
    <Card>
      <div style={{ display: "flex", flexDirection: "row" }}>
        {tags.map((tag, index) => (
          <div key={index} style={{ marginRight: "10px" }}>
            <Tag size="large">{tag}</Tag>
          </div>
        ))}
      </div>
    </Card>
  );
}
