import React from "react";
import { Card, DataTable, Text, Thumbnail } from "@shopify/polaris";
import { ImageIcon } from "@shopify/polaris-icons";

export default function CollectionsTable({ collections }) {
  return (
    <div>
      <Card>
        {collections.map((collection) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: "4px 20px",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Thumbnail
                source={
                  collection.image ? collection.image.originalSrc : ImageIcon
                }
                alt={collection.image ? collection.image.altText : ""}
              />
              <p style={{ marginLeft: "20px" }}>{collection.title}</p>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
