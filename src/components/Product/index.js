import React from 'react';
import { Card, Classes } from "@blueprintjs/core";
import "./styles.scss";

const Product = ({ currentProduct }) => {
    console.log(currentProduct);
    //const loading = currentProduct.productId;
    if (!currentProduct) return null;
    
    return (
    <Card className={`product`}>
    <img width="100" height="100" src={currentProduct.imageUrl} alt=""></img>
    </Card>
)
    }
export default Product;
