const router = require("express").Router();
const { isUser, isOwner } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { createHousing, updateHousing } = require("../services/housingService");
const mapError = require("../util/mapper");

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create offer", data: {} });
});

router.post("/create", isUser(), async (req, res) => {
  const housing = {
    name: req.body.name,
    type: req.body.type,
    year: req.body.year,
    city: req.body.city,
    image: req.body.image,
    description: req.body.description,
    availablePieces: Number(req.body.availablePieces),
    owner: req.session.user._id,
  };
  // console.log(req.body);
  try {
    await createHousing(housing);
    res.redirect("/catalog");
  } catch (err) {
    console.error(err);
    const errors = mapError(err);
    res.render("create", { title: "Create offer", data: housing, errors });
  }
});

router.get("/edit/:id", preload(), isOwner(), (req, res) => {
  res.render("edit", { title: "Update page" });
});

router.post("/edit/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;

  const housing = {
    name: req.body.name,
    type: req.body.type,
    year: req.body.year,
    city: req.body.city,
    image: req.body.image,
    description: req.body.description,
    availablePieces: req.body.availablePieces,
  };

  try {
    await updateHousing(id, housing );
    res.redirect("/details/" + id);
   
  } catch (err) {
    console.error(err);
    const errors = mapError(err);
    housing._id = id;
    res.render("edit", { title: "Update offer", housing, errors });
  }
});

module.exports = router;
