const authController = require("../controllers/authController");
const homeController = require("../controllers/homeController");
const housingController = require("../controllers/housingController");


module.exports = (app) => {
  app.use(authController);
  app.use(homeController);
  app.use(housingController)
  
  app.use('*', (req, res)=>{
    res.render('404',{title: 'Page not found'} )
})
};
