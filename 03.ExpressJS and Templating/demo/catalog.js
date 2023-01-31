const { Router } = require("express");

const router = Router();

router.get("/catalog", (req, res) => {
  res.send("Catalog");
});
router.get("/catalog/:productId", (req, res) => {
  console.log(req.params);
  res.send(`Product with id ${req.params.productId}`);
});
router.get("/catalog/:category/:productId", (req, res) => {
  res.send("Product from Category");
});
router.get("/catalog/*", (req, res) => {
  res.send("Product Page");
});

module.exports = router;