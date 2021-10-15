const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id: { type: ObjectId },
    userName: { type: String },
    // email: { type: Number },
    password: { type: String },
})

module.exports = mongoose.model('User', 
userSchema)