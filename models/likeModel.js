const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;
// const connection = mongoose.createConnection('mongodb://localhost:27017/Classes');

const likeSchema = new Schema({
    id_like: { type: ObjectId },
    id_product:{type: ObjectId, ref: 'Product'},
    liker:[{id_user:{type: ObjectId, ref: 'users'}}],
    countLiker: { type:Number}
})
module.exports = mongoose.model('Like', 
likeSchema)