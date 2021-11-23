const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;
// const connection = mongoose.createConnection('mongodb://localhost:27017/Classes');

const cartSchema = new Schema({
    idType: { type: ObjectId },
    id_user: { type: Schema.Types.ObjectId,ref: 'users' },
    id_product:{type: ObjectId, ref: 'Product'},
    date: { type:Date},
    content: { type:String},
    image:{type: String},
    rate:{ type: Number}
})
module.exports = mongoose.model('Comments', 
cartSchema)