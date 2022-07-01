const Hotel = require('../models/Hotel');


async function getAllHotels() {
    return Hotel.find({}).lean()
}

async function getHotelById(id) {
    return Hotel.findById(id).populate('owner').lean()
}

async function getHotelAndUsers(id) {
    return Hotel.findById(id).populate('owner').populate('userBookedRoom').lean()
}

async function createHotel(hotel) {
    const result = new Hotel(hotel);
    await result.save();
}

async function updateHotel(id, hotel) {
    const existing = await Hotel.findById(id);

    existing.name = hotel.name;
    existing.city = hotel.city;
    existing.freeRooms = hotel.freeRooms;
    existing.imgUrl = hotel.imgUrl;

    await existing.save();
}
async function deleteById(id){
    await Hotel.findByIdAndDelete(id)
};

async function likeHotel(hotelId, userId){
    const hotel= await Hotel.findById(hotelId);

    if(hotel.userBookedRoom.includes(userId)){
        throw new Error( 'User already liked!')
    }

    hotel.userBookedRoom.push(userId);
    await hotel.save()
}

module.exports = {
    getHotelById,
    createHotel,
    getAllHotels,
    getHotelAndUsers,
    updateHotel,
    deleteById,
    likeHotel
}

