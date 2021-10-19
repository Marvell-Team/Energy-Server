const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const imageSchema = new Schema({
    id: { type: ObjectId },
    nameImage:{type:Array}
})

module.exports = mongoose.model('ImageProduct', 
imageSchema)