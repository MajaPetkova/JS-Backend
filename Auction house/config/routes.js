const authController= require("../controllers/authController")
const auctionController= require("../controllers/auctionController");
const homeController = require("../controllers/homeController")

module.exports= (app)=>{
    app.use(authController);
    app.use(auctionController);
    app.use(homeController);
    
    app.get("*", (req, res)=>{
        res.render("404", {title: "Page not found"})
    })
}