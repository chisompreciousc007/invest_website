const mongoose = require("mongoose");
// const { types } = require("@hapi/joi");
var Schema = mongoose.Schema;
const ReceiptSchema = new Schema({
    getter_name: { type: String },
    getter_id: { type: String },
    getter_accountName: { type: String },
    getter_accountNumber: { type: String },
    getter_bank: { type: String },
    getter_phone: { type: String },
    provider_name: { type: String },
    provider_id: { type: String },
    provider_phone: { type: String },
    amount: { type: Number },
    isConfirmed: { type: Boolean, default: false },
    isPurged: { type: Boolean, default: false },
    popPath: { type: String, default: null },


}, { timestamps: true });

module.exports = mongoose.model("Receipt", ReceiptSchema);
