const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const validate = require("mongoose-validator");

const nameValidator = [
  validate({
    validator: "isLength",
    arguments: [5, 50],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isAscii",
    message: "accountName should contain ASCII characters only",
  }),
];

const emailValidator = [
  validate({
    validator: "isLength",
    arguments: [5, 50],
    message: "email should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isEmail",
    message: "email must be valid",
  }),
];

const phoneValidator = [
  validate({
    validator: "isLength",
    arguments: [11, 15],
    message: "phone should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isNumeric",
    message: "phone should contain numeric characters only",
  }),
];
const accountNameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 70],
    message: "accountName should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isAscii",
    message: "accountName should contain ASCII characters only",
  }),
];
const accountNoValidator = [
  validate({
    validator: "isLength",
    arguments: [8, 15],
    message: "accountNo should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isNumeric",
    message: "accountNo should contain numeric characters only",
  }),
];
const bankValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 30],
    message: "bank should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isAscii",
    message: "accountName should contain ASCII characters only",
  }),
];

const GherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: nameValidator,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      validate: phoneValidator,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      uniqueCaseInsensitive: true,
      validate: emailValidator,
    },

    accountName: {
      type: String,
      lowercase: true,
      required: true,
      validate: accountNameValidator,
    },
    accountNo: {
      type: String,
      required: true,
      validate: accountNoValidator,
    },
    bank: {
      type: String,
      lowercase: true,
      required: true,
      validate: bankValidator,
    },
  },
  { timestamps: true }
);
GherSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("Gher", GherSchema);
