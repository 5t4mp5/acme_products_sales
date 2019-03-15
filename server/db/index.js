const db = require("./db");
const Product = require("./Product");
const seed = require("./seed");

const dbSyncAndSeed = () => {
  return db
    .authenticate()
    .then(() => db.sync({ force: true }))
    .then(() => seed())
    .then(() => console.log("db sync complete"));
};

module.exports = { dbSyncAndSeed, Product };
