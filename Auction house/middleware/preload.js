const auctionService = require("../services/auctionService");

function preload(populate) {
  return async function (req, res, next) {
    const id = req.params.id;
    if (populate) {
      res.locals.auction = await auctionService.getAuctionAndUsers(id);
    } else {
      res.locals.auction = await auctionService.getAuctionById(id);
    }
    next();
  };
}
module.exports = preload;
