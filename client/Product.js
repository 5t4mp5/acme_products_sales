import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, remove }) => {
  const { id, name, price, salePrice, onSale, availability } = product;
  const availabilityMap = {
    instock: "success",
    backordered: "warning",
    discontinued: "danger"
  };
  return (
    <li className="list-group-item" key={id}>
      <Link to={`/Products/${product.id}`} key={product.id}>
        {name}
      </Link>
      <br />
      <span style={onSale ? { textDecoration: "line-through" } : {}}>
        ${price.toFixed(2)}
      </span>
      {onSale ? (
        <div style={{ margin: { bottom: "5px" } }}>
          <span className="badge badge-success">${salePrice.toFixed(2)}</span>
        </div>
      ) : (
        ""
      )}
      <div style={{ margin: { bottom: "5px" } }}>
        <span className={`badge badge-${availabilityMap[availability]}`}>
          {availability}
        </span>
      </div>
      <br />
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => remove(product)}
      >
        Delete
      </button>
    </li>
  );
};

export default Product;
