const router = require("express").Router();
const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { createAuction, updateAuction } = require("../services/auctionService");
const mapErrors = require("../util/mapper");

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create Page", data: {} });
});
router.post("/create", isUser(), async (req, res) => {
  const auction = {
    title: req.body.title,
    category: req.body.category,
    image: req.body.image,
    price: Number(req.body.price),
    description: req.body.description,
    owner: req.session.user._id,
  };

  console.log(auction);
  try {
    await createAuction(auction);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("create", { title: "Create Page", data: auction, errors });
  }
});

router.get("/edit/:id", preload(), isOwner(), (req, res) => {
  res.render("edit", { title: "Update Page" });
});

router.post("/edit/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;
  const auction = {
    title: req.body.title,
    category: req.body.category,
    image: req.body.image,
    price: Number(req.body.price),
    description: req.body.description,
  };
  try {
    await updateAuction(id, auction);
    res.redirect("/details/" + id);
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    auction._id = id;
    res.render("edit", { title: "Update Page", data: auction, errors });
  }
});

module.exports = router;
