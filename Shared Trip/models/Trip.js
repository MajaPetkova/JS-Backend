const { Schema, model, Types: { ObjectId } } = require('mongoose');
const URL_PATTERN = /https?:\/\/(.+)/;
// TODO add validation
const tripSchema = new Schema({
    start: { type: String, required: true, minlength: [4, 'Starting point should be at least 4 charachters long'] },
    end: { type: String, required: true, minlength: [4, 'End point should be at least 4 charachters long'] },
    date: { type: String, required: true },
    time: { type: String, required: true },
    carImg: {
        type: String, required: true, validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Car image should be valid Url'
        }
    },
    carBrand: { type: String, required: true, minlength: [4, 'Car brand should be at least 4 charachters long'] },
    seats: { type: Number, required: true, min:0, max:4 },
    price: { type: Number, required: true, min: 1, max: 50 },
    description: { type: String, required: true, minlength: [10, 'Description should be at least 4 charachters long'] },
    owner: { type: ObjectId, ref: 'User', required: true },
    buddies: { type: [ObjectId], ref: 'User', default: [] }
});
const Trip = model('Trip', tripSchema);
module.exports = Trip;