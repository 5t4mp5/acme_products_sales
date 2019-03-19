const express = require("express");
const app = express();
const router = require("./api/router");
const path = require("path");

app.use(express.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/*", (req, res, next) => {
  res.send("index.html");
});

module.exports = app;
