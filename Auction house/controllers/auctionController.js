const router = require("express").Router();
const { isUser } = require("../middleware/guards");
const { createAuction } = require("../services/auctionService");
const mapErrors = require("../util/mapper");


router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create Page", data: {} });
});
router.post("/create", isUser(), async (req, res) => {
  const auction = {
    title: req.body.title,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price,
    description: req.body.description,
    owner: req.session.user._id 
  };

    console.log(auction);
  try {
    await createAuction(auction);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("create", {title: "Create Page", data: auction, errors});
  }
});

module.exports = router;
