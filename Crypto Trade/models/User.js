const { Schema, model, Types:{ObjectId} } = require('mongoose')

// TODO change user model according to exam description 
// TODO add validation
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    username: { type: String, required: true, minlength:[5, 'Username has to be at least 5 charachters long'] },
    email: {
        type: String,   required: true, minlength:[10,'Email has to be at least 10 charachters long'],
     
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value)
            },
            message: 'Email must be valid and may contain only english letters'
        }
    },
    hashedPassword: { type: String, required: true },
    // crypto:{type: [ObjectId], ref:'Crypto', default:[]}
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