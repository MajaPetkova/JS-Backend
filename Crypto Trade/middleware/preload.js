//TODO replace with actual service;
const cryptoService = require('../services/cryptoService');

function preload(populate) {
    return async function (req, res, next) {
        const id = req.params.id;
        if (populate) {
            res.locals.crypto = await cryptoService.getCryptoAndUsers(id)
        } else {
            res.locals.crypto = await cryptoService.getCryptoById(id)
            //TODO: change propertyname to match collection

            next();
        }
    }
}
module.exports = preload;