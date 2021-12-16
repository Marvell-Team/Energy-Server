const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const OtpSchema = new Schema(
  {
    email: { type: String, require: true },
    otp: { type: String, require: true },
  },
  { timestamps: true }
);
OtpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 180 });
module.exports = mongoose.model("Otp", OtpSchema);
