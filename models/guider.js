const mongoose = require("mongoose");

const GuiderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    username: {
      type: String,
    },
    amount: {
      type: Number,
      default: 1000,
    },
  },
  { timestamps: true }
);
// GuiderSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Guider", GuiderSchema);
