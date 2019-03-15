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
        type: Sequelize.INTEGER,
        allowNull: false
    },
    salePrice: {
        type: Sequelize.INTEGER,
    },
    availability: {
        type: Sequelize.ENUM("instock", "backordered", "discontinued")
    },
    discountPercent: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
}, {
    hooks: {
        beforeCreate: (product) => {
            if(product.discountPercent){
                product.salePrice = (product.price * (100 - product.discountPercent)/100);
            }else{
                product.salePrice = product.price;
            }
        }
    }
});
