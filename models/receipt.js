const mongoose = require("mongoose");
// const { types } = require("@hapi/joi");
const ReceiptSchema = new mongoose.Schema(
  {
    gher_name: { type: String },
    gher_email: { type: String },
    gher_accountName: { type: String },
    gher_accountNo: { type: String },
    gher_bank: { type: String },
    gher_phone: { type: String },
    pher_name: { type: String },
    pher_email: { type: String },
    pher_phone: { type: String },
    amount: { type: Number },
    isActivationFee: { type: Boolean, default: false },
    popImage: {
      contentType: {
        type: String,
        default: null,
      },
      path: {
        type: String,
        default: null,
      },
      data: {
        type: Buffer,
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", ReceiptSchema);
