const mongoose = require("mongoose");
const GherSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
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
// GherSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Gher", GherSchema);
