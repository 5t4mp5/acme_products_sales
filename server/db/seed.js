const Product = require("./Product");

module.exports = () => {
  return Promise.all([
    Product.create({
      name: "foo",
      price: 10,
      discountPercentage: 50,
      availability: "instock"
    }),
    Product.create({
      name: "bar",
      price: 21.4442,
      availability: "backordered"
    }),
    Product.create({
      name: "bazz",
      price: 23,
      discountPercentage: 33.34,
      availability: "backordered"
    }),
    Product.create({
      name: "quq",
      price: 100,
      availability: "discontinued"
    })
  ]);
};
