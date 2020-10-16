const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const ActivationReceiptSchema = new mongoose.Schema(
  {
    gher_name: { type: String },
    gher_email: { type: String },
    gher_accountName: { type: String },
    gher_accountNo: { type: String },
    gher_bank: { type: String },
    gher_phone: { type: String },
    pher_name: { type: String },
    pher_email: { type: String, unique: true },
    pher_phone: { type: String, unique: true },
    amount: { type: Number },
    popPath: { type: String, default: null },
  },
  { timestamps: true }
);
ActivationReceiptSchema.plugin(uniqueValidator, {
  message: "is already existing.",
});
module.exports = mongoose.model("ActivationReceipt", ActivationReceiptSchema);
