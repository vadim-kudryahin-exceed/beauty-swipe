import React from "react";
import { Card, Classes, H3 } from "@blueprintjs/core";
import "./styles.scss";

const Product = ({ currentProduct }) => {
  const { imageUrl, name, brand } = currentProduct || {};
  const isProductNotFetched = !currentProduct;
  return (
    <Card className={`product`} elevation={3}>
      <div className={`product-img ${isProductNotFetched && Classes.SKELETON}`}>
        <img src={imageUrl || ""} alt="" />
      </div>
      <H3
        className={`product-title ${isProductNotFetched && Classes.SKELETON}`}
      >
        {name}
      </H3>
      <p className={`product-brand ${isProductNotFetched && Classes.SKELETON}`}>{brand}</p>
    </Card>
  );
};
export default Product;
