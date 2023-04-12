//TODO replace with actual service;
const adService = require("../services/adService")

function preload(populate) {
  return async function (req, res, next) {
    const id = req.params.id;
    //TODO: change propertyName to match collection // data-change and collection name
    
    if (populate) {
      res.locals.ad = await adService.getAdAndUsers(id);
    } else {
      res.locals.ad = await adService.getAdById(id);
    }

    next();
  };
}
module.exports = preload;
