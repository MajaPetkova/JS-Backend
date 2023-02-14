const { Schema, model, Types:{ObjectId}} = require("mongoose");

const pattern= /^https?:\/\/(.+)/;

const bookSchema = new Schema({
title: {type: String, minLength:[2, "Title must be at least 2 characters long"]},
author: {type: String, minLength:[5, "Authors name must be at least 5 characters long"]},
genre: {type: String, minLength:[3, "Genre must be at least 3 characters long"]},
stars: {type: Number, min:[1, "Minimum stars can be 1"], max:[5, "Maximum stars can be 5"]},
image: {type: String, minLength:[5, "Genre must be at least 3 characters long"]},
review: {type: String, validate:{
    validator(value){
    return pattern.test(value)
    },
    message: "Image must be a valid URL"
}},
wishingList:{type:[ObjectId], ref: "User", default:[] },
owner: {type: ObjectId, ref: "User", required: true}
});
const Book= model("Book", bookSchema);
module.exports= Book;
