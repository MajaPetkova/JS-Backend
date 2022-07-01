const { Schema, model, Types: { ObjectId } } = require('mongoose');
const URL_PATTERN = /https?:\/\/(.+)/;

const hotelSchema = new Schema({
    name: { type: String,required: true, minlength:[4,'Name must be at least 4 characters long']},
    city: { type: String, required: true ,minlength:[3,'City must be at least 3 characters long']},
    imgUrl: { type: String, required: true, validate:{
        validator(value) {
            return URL_PATTERN.test(value)
        },
        message: 'Hotel image should be valid Url'
    }
     },
    freeRooms: { type: Number,required: true,  min: 0, max: 100 },
    userBookedRoom: { type: [ObjectId], ref: 'User', default:[] },
    owner:{ type: ObjectId, ref:'User', required:true}
});
// hotelSchema.index({ username: 1 }, {
//     unique: true,
//     collation: {
//         locale: 'en',
//         strength: 2
//     }
// });

const Hotel = model('Hotel', hotelSchema);
module.exports = Hotel;