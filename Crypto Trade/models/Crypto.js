const { Schema, model, Types:{ObjectId} } = require('mongoose')
const URL_PATTERN = /^https?:\/\/(.+)/;

const cryptoSchema = new Schema({
    name: { type: String, minlength:[2, 'TheName should be at least 2 charachters long'] },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Image must be a valid Url'
        }
    },
    price: { type: Number,required:true, min:[0,'Price must be a positive number'] },
    description:{type: String, minlength:[10, 'Descriprion must be at least 1o charachters long']},
    payment: { type: String, required: true, },
    buy: { type: [ObjectId], ref:'User', default:[] },
    owner: { type: ObjectId,  ref: 'User', required: true, },
});
const Crypto = model('Crypto', cryptoSchema);
module.exports = Crypto;