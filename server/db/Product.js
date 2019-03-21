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
        product.onSale = product.discountPercentage > 0;
        if (product.onSale) {
          product.salePrice = product.price * ((100 - product.discountPercentage) / 100);
        }else{
          product.salePrice = product.price;
        }
      }
    }
  }
);
