const router = require("express").Router();
const preload = require("../middleware/preload");
const { getAllAds, getAdById } = require("../services/adService");


router.get("/", (req, res) => {
  console.log(req.session);
  res.render("home");
});

router.get("/catalog", async (req, res) => {
  const ads = await getAllAds();
  res.render("catalog", { title: "Catalog Page", ads });
});

router.get("/catalog/:id", preload(true), (req, res) => {
    // res.locals.ad.remainingSeats = res.locals.trip.seats - res.locals.trip.buddies.length;
    // res.locals.ad.buddiesList = res.locals.trip.buddies.map(b => b.email).join(', ')
    if (req.session.user) {
        res.locals.ad.hasUser = true;
        res.locals.ad.isOwner = req.session.user._id == res.locals.ad.owner._id;

        if (res.locals.ad.users.some(b => b._id == req.session.user._id)) {
            res.locals.ad.isJoined = true
        }
    }
  res.render("details", {title: "Details Page"});
});
module.exports = router;
