const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const PherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    amount: {
      type: Number,
    },
  },
  { timestamps: true }
);
PherSchema.plugin(uniqueValidator, { message: "is already existing." });

module.exports = mongoose.model("Pher", PherSchema);
