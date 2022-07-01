//TODO replace with actual service;
const hotelService = require('../services/hotelService');

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        if (populate) {
            res.locals.hotel = await hotelService.getHotelAndUsers(id)
        } else {
            res.locals.hotel = await hotelService.getHotelById(id);
        }


        //TODO: change propertyname to match collection
        next();
    }
}
module.exports = preload;