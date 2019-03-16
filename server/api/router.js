const router = require("express").Router();
const { Product } = require("../db");

router.get("/products", (req, res, next) => {
  Product.findAll({ order: [["id", "asc"]] })
    .then(products => res.json(products))
    .catch(next);
});

router.post("/products", (req, res, next) => {
  const { name, price, discountPercentage, availability } = req.body;
  const onSale = discountPercentage !== undefined;
  Product.create({
    name,
    price,
    discountPercentage,
    availability,
    onSale
  })
    .then(() => res.sendStatus(201))
    .catch(next);
});

router.delete("/products", (req, res, next) => {
  Product.destroy({ where: { id: req.body.id } })
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
