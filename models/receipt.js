const mongoose = require("mongoose");
// const { types } = require("@hapi/joi");
var Schema = mongoose.Schema;
const ReceiptSchema = new Schema(
  {
    gher: {
      name: { type: String },
      _id: { type: String },
      accountName: { type: String },
      accountNumber: { type: String },
      bank: { type: String },
      phone: { type: String },
    },
    pher: {
      name: { type: String },
      _id: { type: String },
      phone: { type: String },
    },
    amount: { type: Number },
    isConfirmed: { type: Boolean, default: false },
    isPurged: { type: Boolean, default: false },
    popPath: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Receipt", ReceiptSchema);
