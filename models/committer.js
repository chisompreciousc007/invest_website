const mongoose = require("mongoose");

const CommitterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    amount: {
      type: Number,
      default: 0,
    },
    pledgeIndex: {
      type: Number,
    },
  },
  { timestamps: true }
);
// CommitterSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Committer", CommitterSchema);
