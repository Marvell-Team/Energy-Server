const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const billSchema = new Schema({
  id_billdetail: { type: ObjectId },
  id_store: { type: Schema.Types.ObjectId, ref: "Store" },
  products: [
    {
      id_product: { type: ObjectId, ref: "Product" },
      amount: { type: Number },
    },
  ],
  id_bill: { type: Schema.Types.ObjectId, ref: "Bill" },
  total: { type: Number },
  status: { type: Boolean },
});
module.exports = mongoose.model("BillDetail", billSchema);
