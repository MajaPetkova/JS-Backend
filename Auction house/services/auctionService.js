const Auction = require("../models/Auction");

async function getAllAuctions() {
  return Auction.find({}).lean();
}
async function getAuctionById(id) {
  return Auction.findById(id).lean();
}
async function getAuctionAndUsers(id) {
  return Auction.findById(id)
    .populate("owner")
    .populate("bidder")
    .lean();
}
async function createAuction(auction) {
  const result = new Auction(auction);
  await result.save();
}
async function updateAuction(id, auction){
const existing = await Auction.findById(id);

    existing.title= auction.title;
    existing.category= auction.category;
    existing.image= auction.image;
    existing.price = Number(auction.price);
    existing.description= auction.description;

    await existing.save();

}


module.exports = {
  getAllAuctions,
  getAuctionById,
  createAuction,
  getAuctionAndUsers,
  updateAuction
};
