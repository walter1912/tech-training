import React from "react";
import ProductsTable from "../ProductsTable";
import CollectionsTable from "../CollectionsTable";
import TagsList from "./TagsList";

export default function RenderScopeList({ scopeListFull, scopeType }) {
  if (scopeListFull.length <= 0) return <></>;
  if (scopeType === "all") return <div>All product are applied</div>;
  if (scopeType === "productScope") {
    if (scopeListFull[0].id && scopeListFull[0].id.includes("Product"))
      return (
        <div>
          <h4>List choosed products</h4>
          <ProductsTable products={scopeListFull} />
        </div>
      );
  }
  if (scopeType === "collectionScope") {
    if (scopeListFull[0].id && scopeListFull[0].id.includes("Collection"))
      return (
        <div>
          <h4>List choosed collections</h4>
          <CollectionsTable collections={scopeListFull} />
        </div>
      );
  }
  if (scopeType === "tagScope") {
    if (!scopeListFull[0].id)
      return (
        <div>
          <h4>List choosed tags</h4>
          <TagsList tags={scopeListFull} />
        </div>
      );
  }
  return <div>No items choosed</div>;
}
