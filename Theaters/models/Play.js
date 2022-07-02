const { Schema, model, Types:{ObjectId} } = require('mongoose')

// TODO change user model according to exam description 
// TODO add validation

const playSchema = new Schema({
    title: { type: String, required: true, minlength: [1, 'Name is required']},
    description: { type: String, required: true , minlength:1, maxlength:50},
    imageUrl: { type: String, required: true },
    isPublic:{type: Boolean, defalult:false},
    
    users:{type: [ObjectId], ref:'Play', default:[]},
    owner:{type: ObjectId, ref: 'User', required:true}
});


const Play = model('Play', playSchema);
module.exports = Play;