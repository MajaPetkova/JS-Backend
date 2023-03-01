//TODO replace with actual service;
const auctionService = require("../services/auctionService");

function preload() {
    return async function(req, res, next) {
        const id = req.params.id;

        const auction = await auctionService.getAuctionById(id);
        res.locals.auction = auction;
        next();
    }
}
module.exports = preload;