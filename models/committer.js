const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const CommitterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    amount: {
      type: Number,
      default: 0,
    },
    isFufilled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
CommitterSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Committer", CommitterSchema);
