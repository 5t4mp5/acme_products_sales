const db = require("./db");
const Sequelize = db.Sequelize;

module.exports = db.define("product", {
    onSale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    salePrice: {
        type: Sequelize.FLOAT,
    },
    availability: {
        type: Sequelize.ENUM("instock", "backordered", "discontinued")
    },
    discountPercent: {
        type: Sequelize.FLOAT,
    }
}, {
    hooks: {
        beforeCreate: (product) => {
            product.price = product.price.toFixed(2);
            if(product.discountPercent){
                product.onSale = true;
                product.salePrice = (product.price * (100 - product.discountPercent)/100).toFixed(2);
            }else{
                product.salePrice = product.price;
            }
        }
    }
});
