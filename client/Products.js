import React, { Fragment } from "react";
import Product from "./Product";

const Products = ({ products, remove }) => {
  return (
    <Fragment>
      <ul className="list-group">
        {products.map(product => (
          <Product key={product.id} product={product} remove={remove} />
        ))}
      </ul>
    </Fragment>
  );
};

export default Products;
