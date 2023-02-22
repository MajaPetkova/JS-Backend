const router = require("express").Router();
const { isUser } = require("../middleware/guards");
const { createHousing } = require("../services/housingService");
const mapError = require("../util/mapper");

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create offer", data: {} });
});

router.post("/create", isUser(), async(req, res) => {
  const housing = {
    name: req.body.name,
    type: req.body.type,
    year: req.body.year,
    city: req.body.city,
    image: req.body.image,
    description: req.body.description,
    availablePieces: req.body.availablePieces,
    owner: req.session.user._id
  };
  console.log(req.body);
  try {
    await createHousing(housing);
    res.redirect("/catalog");

  } catch (err) {
    console.error(err);
    const errors= mapError(err);
    res.render("create", { title: "Create offer", data: housing, errors});
  }
});

module.exports = router;
