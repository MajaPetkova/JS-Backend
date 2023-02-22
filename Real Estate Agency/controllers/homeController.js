const router = require("express").Router();
const preload = require("../middleware/preload");
const { getAllHousings } = require("../services/housingService");


router.get("/", async (req, res) => {
    const housings =  (await getAllHousings()).sort((a,b)=> a.year - b.year)
  res.render("home", { title: "Home Page", housings });
});

router.get("/catalog", async(req, res) => {
   const housings = await getAllHousings()
  res.render("catalog", { title: "Catalog",  housings });
});

router.get("/details/:id",preload(), (req, res) => {
    res.render("details", { title: "Details Page"});
});

module.exports = router;
