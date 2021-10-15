const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const classSchema = new Schema({
    id: { type: ObjectId },
    fullName: { type: String },
    phoneNumber: { type: Number },
    avatar: { type: String },
    startDate: { type: Date },
    idType: { type: Schema.Types.ObjectId,
         ref: 'Category' },
})

module.exports = mongoose.model('Class', 
classSchema)