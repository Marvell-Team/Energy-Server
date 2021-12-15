const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OtpSchema = new Schema({
  email: { type: String, require: true },
  otp: { type: String, require: true },
  expire_at: { type: Date, default: Date.now, expires: 300 },
});

module.exports = mongoose.model("Otp", OtpSchema);
