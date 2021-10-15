const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;
// const connection = mongoose.createConnection('mongodb://localhost:27017/Classes');

const categorySchema = new Schema({
    idType: { type: ObjectId },
    nameClass: { type: String },
})

module.exports = mongoose.model('Category', 
categorySchema)