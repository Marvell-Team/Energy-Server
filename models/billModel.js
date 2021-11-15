const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const billSchema = new Schema({
    id_bill: { type: ObjectId },
    id_user: { type: Schema.Types.ObjectId,ref: 'users' },
    date_bill:{type:Date},
    note_bill:{name:{type: String},phone:{type: Number}}
})
module.exports = mongoose.model('Bill', 
billSchema)