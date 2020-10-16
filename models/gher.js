const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const GherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
    isPaired: {
      type: Boolean,
      default: false,
    },
    isFirst: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
GherSchema.plugin(uniqueValidator, { message: "is already existing." });

module.exports = mongoose.model("Gher", GherSchema);
