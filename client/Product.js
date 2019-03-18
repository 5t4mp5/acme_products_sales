import React from "react";

const Product = ({ product, remove }) => {
  const { id, name, price, salePrice, onSale, availability } = product;
  const availabilityMap = {
    instock: "success",
    backordered: "warning",
    discontinued: "danger"
  };
  return (
    <li className="list-group-item" key={id}>
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
      <div style={{ margin: { bottom: "5px" } }}>
        <span className={`badge badge-${availabilityMap[availability]}`}>
          {availability}
        </span>
      </div>
      <br />
      <button type="button" className="btn btn-danger" onClick={() => remove(id)}>Delete</button>
    </li>
  );
};

export default Product;
