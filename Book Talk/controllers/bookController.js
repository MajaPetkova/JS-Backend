const { isUser } = require("../middleware/guards");
const { createBook } = require("../services/bookService");
const mapErrors = require("../util/mapper");

const router = require("express").Router();

router.get("/create", isUser(), (req, res)=>{
    res.render("create", {title: "Create Page"})
})
router.post("/create",isUser(), async (req, res)=>{
    const userId= req.session.user._id;  
    const book={
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        stars: req.body.stars,
        image: req.body.image,
        review: req.body.review,
        owner: userId
    }
    try{
        await createBook(book);
        res.redirect("/catalog")
    }catch(err){
     console.error(err);
    const errors= mapErrors(err);
    res.render("create", {title: "Create Page", data: book, errors})
    }
})




module.exports= router;
