//TODO replace with actual service;
const collectionService = {};

function preload() {
    return async function(req, res, next) {
        const id = req.params.id;

        //TODO: change propertyName to match collection
        const data = await collectionService.getById(id);
        res.locals.data = data;
        next();
    }
}
module.exports = preload;