const { Schema, model, Types: { ObjectId } } = require('mongoose')

// TODO change user model according to exam description 
// TODO add validation

const userSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    booked: { type: [ObjectId], ref: 'Hotel', default: [] },
    offered: { type: [ObjectId], ref: 'Hotel', default: [] }
});
userSchema.index({ username: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;