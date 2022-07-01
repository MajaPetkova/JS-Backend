const { Schema, model, Types: { ObjectId } } = require('mongoose');
const URL_PATTERN = /^https?:\/\/(.+)/;

const postSchema = new Schema({
    title: { type: String, minlength: [6, 'Title must be at least 6 character long'] },
    keyword: { type: String, minlength: [6, 'Keyword must be at least 6 character long'] },
    location: { type: String, maxlength: [15, 'Location must be at most 15 character long'] },
    date: {
        type: String,
        minlength: [10, 'Date must be 10 character long'],
        maxlength: [10, 'Date must be 10 charater long']
    },
    image: {
        type: String,
        validate: {
            validator(value) {
                return URL_PATTERN.test(value)
            },
            message: 'Image must be a valid Url'
        }
    },
    description: { type: String, minlength: [8, 'Description must be 8 character long'] },
    author: { type: ObjectId, ref: 'User', require: true },
    votes: { type: [ObjectId], ref: 'User', default: [] },
    rating: { type: Number, default: 0 }


});
const Post = model('Post', postSchema);
module.exports = Post;