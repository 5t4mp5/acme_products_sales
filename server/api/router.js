const router = require("express").Router();
const { Product } = require("../db");

router.get("/products", (req, res, next) => {
  Product.findAll({ order: [["id", "asc"]] })
    .then(products => res.json(products))
    .catch(next);
});

router.get("/products/:id", (req, res, next) => {
  Product.findOne({ where: { id: req.params.id } })
    .then(product => res.json(product))
    .catch(next);
});

router.post("/products", (req, res, next) => {
  let { name, price, discountPercentage, availability } = req.body;
  Product.create({
    name,
    price,
    discountPercentage,
    availability
  })
    .then(product => res.status(201).json(product))
    .catch(next);
});

router.put("/products/:id", (req, res, next) => {
  let { name, price, discountPercentage, availability } = req.body;
  Product.update(
    { name, price, discountPercentage, availability },
    { where: { id: req.params.id * 1 } }
  )
    .then(product => res.json(product))
    .catch(next);
});

router.delete("/products/:id", (req, res, next) => {
  Product.destroy({ where: { id: req.params.id } })
    .then(product => res.status(201).json(product))
    .catch(next);
});

module.exports = router;
