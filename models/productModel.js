const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    nameProduct: { type: String },
    price: { type: Number },
    imgProduct: { type: String },
    material: { type: String },
    idType: { type: Schema.Types.ObjectId,
         ref: 'Category' },
})

module.exports = mongoose.model('Product', 
productSchema)