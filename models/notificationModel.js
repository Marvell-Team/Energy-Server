const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const NotificationSchema = new Schema({
    id: { type: ObjectId },
    id_user: { type: Schema.Types.ObjectId,ref: 'users' },
    id_billdetail: { type: Schema.Types.ObjectId,ref: 'BillDetail' },
    content:{ type:String},
    date:{ type:Date},
})
module.exports = mongoose.model('Notification', 
NotificationSchema)