const Accessory = require("../models/Accessories");

async function createAccessory(accessory){
 await Accessory.create(accessory)
}


module.exports = () => (req, res, next) => {
    req.accessory = {
   createAccessory
    };
    next();
  };