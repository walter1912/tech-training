import { Link,  DataTable, Thumbnail, Badge } from "@shopify/polaris";
import  { useCallback } from "react";
import { useNavigate } from "@remix-run/react";
import { getNumberIdProduct } from "../../../libs/handleString";
import CustomHeader from "./CustomHeader";
import { ImageIcon } from "@shopify/polaris-icons";

export default function ProductsTable({ products, isPricingRule = false }) {

  const navigate = useNavigate();

  const handleClickLink = useCallback(
    (product) => {
      let id = getNumberIdProduct(product.id);
      navigate(`/app/products/${id}`);
    },
    [products],
  );
  const rows = products.map((product) => {
    return [
      <Thumbnail
        source={product.images.length > 0 ? product.images[0].url : ImageIcon}
        alt={product.images.length > 0 ? product.images[0].altText : "no image"}
      />,
      <Link
        removeUnderline
        onClick={() => handleClickLink(product)}
        key={product.id}
      >
        {product.title}
      </Link>,
      <Badge tone="success">{product.status}</Badge>,
      <div>
        {product.collections && product.collections.length > 0 ? (
          product.collections.map((collection) => (
            <p key={collection.id}>{collection.title}</p>
          ))
        ) : (
          <></>
        )}
      </div>,
      <div>
        {product.tags.length > 0 &&
          product.tags.map((tag, index) => <p key={index}>{tag}</p>)}
      </div>,
      <strong> {product.vendor}</strong>,
      <p style={{ color: "orange" }}>{product.variants[0].price} </p>,
      <p style={{ color: "orange" }}>{isPricingRule ? product.afterDiscount :"" }</p>,
    ];
  });

  return (
    <div>
      <DataTable
        columnContentTypes={["text", "text", "text", "text", "text", "text", "text", "text"]}
        headings={[
          " ",
          <CustomHeader text="Title" />,
          <CustomHeader text="Status" />,
          <CustomHeader text="Tags" />,
          <CustomHeader text="Collections" />,
          <CustomHeader text="Vender" />,
          <CustomHeader text="Price" />,
         isPricingRule? <CustomHeader text="After discount" /> : "",
        ]}
        rows={rows}
        verticalAlign="middle"
      />
    </div>
  );
}
