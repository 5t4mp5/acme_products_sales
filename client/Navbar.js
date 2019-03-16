import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ products, location }) => {
  const tabs = ["Home", "Products", "Sales", "Create"];
  return (
    <ul className="nav nav-tabs">
      {tabs.map(tab => (
        <li className="nav-item" key={tab}>
          <Link
            to={`/${tab}`}
            className={`nav-link ${
              location.pathname === `/${tab}` ? "active" : ""
            }`}
          >
            {tab}
            {tab === "Products" || tab === "Sales" ? (
              <span className="badge badge-primary">
                {tab === "Products"
                  ? products.length
                  : products.filter(product => product.onSale).length}
              </span>
            ) : (
              ""
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
