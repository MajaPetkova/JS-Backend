const router = require("express").Router();
const { isUser } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { getAllHousings, getAllHousingsSearch } = require("../services/housingService");

router.get("/", async (req, res) => {
  const housings = (await getAllHousings()).sort((a, b) => a.year - b.year);
  res.render("home", { title: "Home Page", housings });
});

router.get("/catalog", async (req, res) => {
  const housings = await getAllHousings();
  res.render("catalog", { title: "Catalog", housings });
});

router.get("/details/:id", preload(true), (req, res) => {
  const housing= res.locals.housing;
 housing.availableHousing = housing.availablePieces - housing.rentedHome.length;
 housing.rentingList= housing.rentedHome.map(x=> x.username).join(", ");

  if (req.session.user) {
   housing.hasUser = true;
   housing.isOwner =  req.session.user._id ==housing.owner._id;

      if(housing.rentedHome.some(x=> x._id == req.session.user._id) ){
          housing.isRented = true;
      }
  }
  // console.log(res.locals.housing);
  res.render("details", { title: "Details Page" });
});


router.get("/search",isUser(), async (req, res) => {
  const query= req.params
  const housings= await getAllHousingsSearch(query)
  res.render("search", { title: "Search Page", housings});
});

module.exports = router;
