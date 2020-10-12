const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const PendingGherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
PendingGherSchema.plugin(uniqueValidator, { message: "is already existing." });

module.exports = mongoose.model("PendingGher", PendingGherSchema);
