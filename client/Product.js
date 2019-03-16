import React from "react";

const Product = ({ product }) => {
    return (
        <li className="list-group-item">{product.name}</li>
    );
};

export default Product;
