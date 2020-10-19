const mongoose = require("mongoose");
// var uniqueValidator = require("mongoose-unique-validator");
const OutstandingGherSchema = new mongoose.Schema(
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
// OutstandingGherSchema.plugin(uniqueValidator, {
//   message: "is already existing.",
// });

module.exports = mongoose.model("OutstandingGher", OutstandingGherSchema);
