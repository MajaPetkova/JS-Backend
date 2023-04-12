const authController= require("../controllers/authController")
const adController= require("../controllers/adController");
const homeController = require("../controllers/homeController")


module.exports= (app)=>{
    app.use(authController);
    app.use(adController);
    app.use(homeController);
    
    app.use('*', (req, res)=>{
        res.render('404',{title: 'Page not found'} )
    })
}