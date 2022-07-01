const authController = require('../controllers/auth')
const homeController = require('../controllers/homeController')
const hotelController = require('../controllers/hotelController')



module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(hotelController)
}