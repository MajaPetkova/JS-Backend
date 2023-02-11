const {Schema,model,Types: { ObjectId }} = require("mongoose");
const { comparePasswords, hashPassword} = require("../services/util");


 const userSchema = new Schema({
  username: { type: String, required: true, minlength: 3, unique: true },
  hashedPassword: { type: String, required: true },
});
userSchema.methods.comparePasswords = async function (password) {
  // use bcrypt to hash and compare incoming password with stores hashed password
 return await comparePasswords(password, this.hashedPassword)

};

userSchema.pre("save", async function(){
    this.hashedPassword= await hashPassword(this.hashedPassword)
console.log("Saving" , this)
})

const User = model("User", userSchema);
module.exports = User;
