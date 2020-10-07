const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const GherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    isPaired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
GherSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Gher", GherSchema);
