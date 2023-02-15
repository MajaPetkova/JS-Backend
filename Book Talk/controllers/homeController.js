const { getAllBooks, getBookById } = require("../services/bookService");
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


router.get("/details/:id", async(req, res) => {
    const id= req.params.id;
    const book= bookViewModel(await getBookById(id));

   if(req.session.user ){
    book.hasUser = true;

    // if( req.session.user._id == book.owner._id){
    //     console.log(book.owner)
    //     console.log(true)
    //     book.isOwner = true;
    //  }
   const hasWish= book.wishingList.includes(req.session.user._id)
    console.log(hasWish)
   }
    res.render("details", { title: "Details Page", book});
  });


module.exports = router;
