const { getAllAds } = require("../services/adService");

const router = require("express").Router();

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("home");
});

router.get("/catalog", async(req, res) => {
 const ads= await getAllAds()
  res.render("catalog", { title: "Catalog Page", ads});
});
module.exports = router;
