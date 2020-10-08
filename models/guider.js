const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const GuiderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);
GuiderSchema.plugin(uniqueValidator, { message: "already exist." });

module.exports = mongoose.model("Guider", GuiderSchema);
