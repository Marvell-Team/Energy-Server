const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    id_user: { type: ObjectId },
    email_user: { type: String },
    name_user: { type: String },
    phone_user: { type: Number },
    address_user: { type: String },
    avt_user: { type: String },
    pwd_user: { type: String },
    gender_user:{ type: String},
    born_day:{type:Date},
    active : { type:Boolean}
})

module.exports = mongoose.model('users', 
userSchema)