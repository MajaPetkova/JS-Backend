const authController= require("../controllers/authController")
const homeController = require("../controllers/homeController");
const bookController= require("../controllers/bookController")

module.exports= (app)=>{
    app.use(homeController)
    app.use(authController);
    app.use(bookController);
}