const Crypto = require('../models/Crypto')

async function getAllCryptos() {
    return Crypto.find({}).lean();
}

async function getCryptoById(id) {
    return Crypto.findById(id).populate('owner').lean()

}
async function createCrypto(crypto) {
    const result = new Crypto(crypto)
    await result.save()
}
async function getCryptoAndUsers(id) {
    return Crypto.findById(id).populate('owner').populate('buy').lean();
};
async function updateCrypto(id, crypto) {
    const existring = await Crypto.findById(id);

    existring.name = crypto.name;
    existring.image = crypto.image;
    existring.price = crypto.price;
    existring.description = crypto.description;
    existring.payment = crypto.payment;

    await existring.save();
};

async function deleteById(id) {
    await Crypto.findByIdAndDelete(id);
};

async function buyCripto(cryptoId, userId) {
    const crypto = await Crypto.findById(cryptoId);

    if (crypto.buy.includes(userId)) {
        throw new Error('You already bought.')
    }
    crypto.buy.push(userId)
    await crypto.save()
};

async function searchCrypto(text){
return Crypto.find({name: text}).lean()
}
module.exports = {
    createCrypto,
    getCryptoById,
    getAllCryptos,
    getCryptoAndUsers,
    updateCrypto,
    deleteById,
    buyCripto,
    searchCrypto
}