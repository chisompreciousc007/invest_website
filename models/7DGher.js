const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const SevenDayGherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
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
SevenDayGherSchema.plugin(uniqueValidator, { message: "is already existing." });

module.exports = mongoose.model("SevenDayGher", SevenDayGherSchema);
