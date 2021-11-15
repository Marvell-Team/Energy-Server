const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;
// const connection = mongoose.createConnection('mongodb://localhost:27017/Classes');

const billSchema = new Schema({
    id_store: { type: ObjectId },
    name_store: { type: String },
    address_store:{type:String}
})
module.exports = mongoose.model('Store', 
billSchema)