const mongoose = require("mongoose");

const CommitterSchema = new mongoose.Schema(
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
// CommitterSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Committer", CommitterSchema);
