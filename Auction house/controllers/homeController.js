const preload = require("../middleware/preload");
const { getAllAuctions } = require("../services/auctionService");

const router = require("express").Router();

router.get("/", (req, res) => {
  // console.log(req.session)
  res.render("home", { title: "Home page" });
});

router.get("/catalog", async(req, res) => {
  const auctions= await getAllAuctions();
  console.log(auctions)
  res.render("browse", { title: "Catalog page", auctions});
});

router.get("/details/:id", preload(true), (req, res)=>{
  res.render("details" , {title: "Details Page"} )
})

module.exports = router;
