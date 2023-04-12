const Ad = require("../models/Ad")


async function createAd (ad){
 const result= new Ad(ad)
await result.save()
}

module.exports= {
    createAd
}