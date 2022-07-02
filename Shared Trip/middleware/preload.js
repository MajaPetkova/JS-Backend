//TODO replace with actual service;
// const collectionService = {};
const tripService = require('../services/tripService')

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        //TODO change property name to match collection
// res.locals.data= trip
        if (populate) {
            res.locals.trip = await tripService.getTripAndUsers(id);
        } else {
            res.locals.trip = await tripService.getTripById(id);
        }

        next();
    }
}
module.exports = preload;