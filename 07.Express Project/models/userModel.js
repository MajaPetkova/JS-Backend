const mongoose = require("mongoose");

const userSchema= mongoose.Schema({
    userName: {
        type: String,
        required :[true, "Please add the user name"]
    },
    email: {
        type: String,
        required :[true, "Please add the user email address"],
        unique : [true, "Email Address is already taken" ]
    },
    password: {
        type: String,
        required :[true, "Please add password"]
    }

});
module.exports = mongoose.model("User", userSchema);