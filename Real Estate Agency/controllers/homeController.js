const router = require("express").Router();
const preload = require("../middleware/preload");
const { getAllHousings } = require("../services/housingService");

router.get("/", async (req, res) => {
  const housings = (await getAllHousings()).sort((a, b) => a.year - b.year);
  res.render("home", { title: "Home Page", housings });
});

router.get("/catalog", async (req, res) => {
  const housings = await getAllHousings();
  res.render("catalog", { title: "Catalog", housings });
});

router.get("/details/:id", preload(true), (req, res) => {
  if (req.session.user) {
    res.locals.housing.hasUser = true;
    res.locals.housing.isOwner = req.session.user._id == res.locals.housing.owner._id;
}

  // console.log(res.locals.housing);
  res.render("details", { title: "Details Page"});
});

module.exports = router;
