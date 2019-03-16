import React from "react";

const Product = ({ product }) => {
  const { name, price, salePrice, onSale, availability } = product;
  return (
    <li className="list-group-item">
      {name}
      <br />
      <span style={onSale ? { textDecoration: "line-through" } : {}}>
        ${price}
      </span>
      {onSale ? (
        <div style={{ margin: { bottom: "5px" } }}>
            <span className="badge badge-success">${salePrice}</span>
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default Product;
