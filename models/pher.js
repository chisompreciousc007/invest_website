const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const PherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
    },
    isPaired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
PherSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Pher", PherSchema);
