const Auction  = require("../models/Auction");

async function getAuctionById(id){
    return Auction.findById(id)
}
async function createAuction (auction){
    const result= new Auction(auction);
    await result.save();
}

module.exports= {
    getAuctionById,
    createAuction
};