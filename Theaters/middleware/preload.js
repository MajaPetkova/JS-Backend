//TODO replace with actual service;
const playService = require('../services/playService')

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        if (populate) {
            res.locals.play = await playService.getPlayAndUsers(id)
        } else {
            res.locals.play= await playService.getPlayById(id)
         }
        //TODO: change propertyname to match collection
    
        next();
    }
}
module.exports = preload;