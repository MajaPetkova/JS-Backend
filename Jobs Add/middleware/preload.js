//TODO replace with actual service;
const collectionService = {};

function preload(populate) {
  return async function (req, res, next) {
    const id = req.params.id;
    //TODO: change propertyName to match collection // data-change and collection name
    
    if (populate) {
      res.locals.trip = await tripService.getTripAndUsers(id);
    } else {
      res.locals.trip = await tripService.getTripById(id);
    }

    next();
  };
}
module.exports = preload;
