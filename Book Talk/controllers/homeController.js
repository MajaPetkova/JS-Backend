const { getAllBooks } = require("../services/bookService");
const { bookViewModel } = require("../util/mapper");

const router = require("express").Router();

router.get("/", (req, res) => {
  // console.log(req.session)
  res.render("home", { title: "Home Page" });
});

router.get("/catalog", async (req, res) => {
  const books = (await getAllBooks()).map(bookViewModel);

  res.render("catalog", { title: "Catalog Page", books });
});

module.exports = router;
