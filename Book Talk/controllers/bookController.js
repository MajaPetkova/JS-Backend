const { isUser } = require("../middleware/guards");
const {
  createBook,
  getBookById,
  updateBook,
  deleteBookById,
  wishBook,
} = require("../services/bookService");
const { mapErrors, bookViewModel } = require("../util/mapper");

const router = require("express").Router();

router.get("/create", isUser(), (req, res) => {
  res.render("create", { title: "Create Page" });
});
router.post("/create", isUser(), async (req, res) => {
  const userId = req.session.user._id;
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    stars: req.body.stars,
    image: req.body.image,
    review: req.body.review,
    owner: userId,
  };
  try {
    await createBook(book);
    res.redirect("/catalog");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("create", { title: "Create Page", data: book, errors });
  }
});

router.get("/edit/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  const book = bookViewModel(await getBookById(id));

  //   if( req.session.user._id != book.owner._id){
  //   res.redirect("/login")
  //    }
  res.render("edit", { title: "Update Page", book });
});

router.post("/edit/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  const existing = bookViewModel(await getBookById(id));

  //   if( req.session.user._id != existing.owner._id){
  //   res.redirect("/login")
  //    }
  const book = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    stars: req.body.stars,
    image: req.body.image,
    review: req.body.review,
  };

  try {
    await updateBook(id, book);
    res.redirect("/details/" + id);
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    book._id = id;
    res.render("edit", { title: "Update Page", book, errors });
  }
});

router.get("/delete/:id", isUser(), async (req, res) => {
  const id = req.params.id; //book
  const existing = bookViewModel(await getBookById(id));

  if (req.session.user._id != existing.owner._id) {
    res.redirect("/login")
  }
  try {
    await deleteBookById(id);
    res.redirect("/catalog");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("details", { title: existing.title, errors });
  }
});

router.get("/wish/:id", isUser(), async (req, res) => {
  const id = req.params.id;
  try {
    await wishBook(id, req.session.user._id)
    res.redirect("/catalog");
  } catch (err) {
    console.error(err);
    const errors = mapErrors(err);
    res.render("details", { title: "Details Page", errors });
  }
});

module.exports = router;
