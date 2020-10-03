const mongoose = require("mongoose");

const PherSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
// PherSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Pher", PherSchema);
