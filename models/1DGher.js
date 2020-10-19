const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const OneDayGherSchema = new mongoose.Schema(
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
    isFirst: {
      type: Boolean,
    },
  },
  { timestamps: true }
);
OneDayGherSchema.plugin(uniqueValidator, { message: "is already existing." });

module.exports = mongoose.model("OneDayGher", OneDayGherSchema);
