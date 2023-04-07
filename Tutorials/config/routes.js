const authController= require("../controllers/authController")
const courseController = require("../controllers/courseController");
const homeController = require("../controllers/homeController")

module.exports= (app)=>{
    app.use(authController);
    app.use(courseController);
    app.use(homeController)
}