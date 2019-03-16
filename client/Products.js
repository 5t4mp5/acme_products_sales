import React from "react";
import Product from "./Product";

const Products = ({ products }) => {
  return (
    <ul className="list-group">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </ul>
  );
};

export default Products;
