const db = require("./db");
const Sequelize = db.Sequelize;

module.exports = db.define(
  "product",
  {
    onSale: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    price: {
      type: Sequelize.FLOAT,
      defaultValue: 0
    },
    salePrice: {
      type: Sequelize.FLOAT
    },
    availability: {
      type: Sequelize.ENUM("instock", "backordered", "discontinued")
    },
    discountPercentage: {
      type: Sequelize.FLOAT
    }
  },
  {
    hooks: {
      beforeSave: product => {
        product.price = Number(product.price);
        product.discountPercentage = Number(product.discountPercentage);
        if (product.discountPercentage) {
          product.onSale = true;
          product.salePrice = (
            (product.price * (100 - product.discountPercentage)) /
            100
          ).toFixed(2);
        } else {
          product.price = product.price.toFixed(2);
          product.salePrice = product.price;
        }
      }
    }
  }
);
