const preload = require("../middleware/preload");
const { getAllAuctions } = require("../services/auctionService");

const router = require("express").Router();

router.get("/", (req, res) => {
  // console.log(req.session)
  res.render("home", { title: "Home page" });
});

router.get("/catalog", async (req, res) => {
  const auctions = await getAllAuctions();
  console.log(auctions);
  res.render("browse", { title: "Catalog page", auctions });
});

router.get("/details/:id", preload(true), (req, res) => {
  // console.log(res.locals.auction);
  if(req.session.user){
    res.locals.auction.hasUser= true;
    res.locals.auction.isOwner = req.session.user._id == res.locals.auction.owner._id ;
  }

  res.render("details", { title: "Details Page" });
});


module.exports = router;
