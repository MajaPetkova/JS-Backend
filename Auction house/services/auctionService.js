const Auction = require("../models/Auction");

async function getAllAuctions() {
  return Auction.find({}).lean();
}
async function getAuctionById(id) {
  return Auction.findById(id).lean();
}
async function getAuctionAndUsers(auctionId, userId) {
  return Auction.findById(auctionId)
    .populate("owner")
    .populate("bidder")
    .lean();
}
async function createAuction(auction) {
  const result = new Auction(auction);
  await result.save();
}
module.exports = {
  getAllAuctions,
  getAuctionById,
  createAuction,
  getAuctionAndUsers
};
