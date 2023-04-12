const Ad = require("../models/Ad")

async function getAllAds(){
return Ad.find({}).lean()
}
async function createAd (ad){
 const result= new Ad(ad)
await result.save()
}

module.exports= {
    getAllAds,
    createAd
}