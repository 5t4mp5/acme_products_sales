const Product = require("./Product");

module.exports = () => {
  return Product.create({
    name: "foo",
    onSale: true,
    price: 10,
    discountPercent: 50,
    availability: "instock"
  });
};
