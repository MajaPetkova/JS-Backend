const Ad = require("../models/Ad")

async function getAllAds(){
return Ad.find({}).lean()
}
async function createAd (ad){
 const result= new Ad(ad)
await result.save()
}
async function getAdById(id){
    return Ad.findById(id).lean()
}
async function getAdAndUsers(id) {
    return Ad.findById(id).populate('owner').populate('users').lean();
}
module.exports= {
    getAllAds,
    createAd,
    getAdById,
    getAdAndUsers
}