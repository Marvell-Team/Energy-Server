const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId;

const productSchema = new Schema({
    id: { type: ObjectId },
    nameProduct: { type: String },
    id_category: { type: Schema.Types.ObjectId,ref: 'Category' },
    id_image: { type: Schema.Types.ObjectId,ref: 'ImageProduct' },
    price_product: { type: Number },
    quantity_product:{ type:Number},
    description_product:{ type: Object},
    stock:{ type:Boolean},
    avg_vote:{ type: Number},
    
})

module.exports = mongoose.model('Product', 
productSchema)