const authController = require('../controllers/auth')
const cryptoController = require('../controllers/cryptoController')
const homeController= require('../controllers/homeController')


module.exports = (app) => {
    app.use(authController)
    app.use(cryptoController)
    app.use(homeController)

    app.get('*', (req, res)=>{
        res.render('404', {title: 'Error Page'})
    })
}