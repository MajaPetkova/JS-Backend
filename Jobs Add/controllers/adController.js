const router = require("express").Router();
const { isUser, isOwner } = require("../middleware/guards");
const mapErrors = require("../util/mapper");
const { createAd } = require("../services/adService");

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create Page" });
});
router.post("/create", isUser(), async (req, res) => {
  console.log(req.body);
  const ad = {
    headline: req.body.headline,
    location: req.body.location,
    companyName: req.body.companyName,
    companyDescription: req.body.companyDescription,
    owner: req.session.user._id
  };
  try {
    await createAd(ad);
    res.redirect("/catalog");
  } catch (err) {
    console.error(err);
    //TODO send error messages
    const errors = mapErrors(err);
    res.render("create", { title: "Create Page", data: ad, errors });
  }
});

module.exports = router;
