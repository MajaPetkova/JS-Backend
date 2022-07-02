const authController = require('../controllers/auth')
const playController= require('../controllers/playController');
const homeController= require('../controllers/homeController')

module.exports = (app) => {
    app.use(authController)
    app.use(playController)
    app.use(homeController)

    // app.get('*', (req, res)=>{
    //     res.render('404',{title: 'Page not found'})
    // })
}