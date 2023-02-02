const { Router } = require("express");
const router = Router();
const { getProducts } = require("./data");

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.locals = {
    products
  };
  res.render("catalog");
  console.log(products)
});
module.exports = router;
