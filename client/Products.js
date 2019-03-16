import React from "react";
import Product from "./Product";

const Products = ({ products, remove }) => {
  return (
    <ul className="list-group">
      {products.map(product => (
        <Product key={product.id} product={product} remove={remove} />
      ))}
    </ul>
  );
};

export default Products;
