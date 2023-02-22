const { getAllHousings } = require("../services/housingService");

const router = require("express").Router();

router.get("/", async (req, res) => {
    const housings =  (await getAllHousings()).sort((a,b)=> a.year - b.year)
  res.render("home", { title: "Home Page", housings });
});

router.get("/catalog", async(req, res) => {
   const housings = await getAllHousings()
   console.log(housings)
  res.render("catalog", { title: "Catalog",  housings });
});



module.exports = router;
