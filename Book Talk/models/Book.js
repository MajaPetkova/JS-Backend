const { Schema, model, Types:{ObjectId}} = require("mongoose");

const URL_PATTERN= /^https?:\/\/(.+)/gm;

const bookSchema = new Schema({
title: {type: String, minLength:[2, "Title must be at least 2 characters long"]},
author: {type: String, minLength:[5, "Authors name must be at least 5 characters long"]},
genre: {type: String, minLength:[3, "Genre must be at least 3 characters long"]},
stars: {type: Number, min:[1, "Minimum stars can be 1"], max:[5, "Maximum stars can be 5"]},
image: {type: String, validate:{
    validator(value){
        return URL_PATTERN.test(value)
    },
    message: "Image must be a valid URL"
}},
review: {type: String, minLength:[5, "Genre must be at least 3 characters long"]},
wishingList:{type:[ObjectId], ref: "User", default:[] },
owner: {type: ObjectId, ref: "User", required: true}
});
const Book= model("Book", bookSchema);
module.exports= Book;
