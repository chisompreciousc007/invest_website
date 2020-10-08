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
const passwordValidator = [
  validate({
    validator: "isLength",
    arguments: [8, 2000],
    message: "password should be between {ARGS[0]} and {ARGS[1]} characters",
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
const usernameValidator = [
  validate({
    validator: "isLength",
    arguments: [3, 20],
    message: "username should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isAlphanumeric",
    message: "username should contain alpha-numeric characters only",
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

const payeeSchema = new mongoose.Schema(
  {
    accountName: String,
    accountNo: String,
    bank: String,
    phone: String,
    amount: { type: Number, default: 0 },
    popPath: { type: String, default: null },
    // isConfirmed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const payerSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    amount: { type: Number, default: 0 },
    popPath: { type: String, default: null },
  },
  { timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      validate: nameValidator,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: usernameValidator,
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
    password: {
      type: String,
      required: true,
      validate: passwordValidator,
    },
    isActivated: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },
    recommit: {
      type: Boolean,
      default: false,
    },

    upline: {
      type: String,
      default: "new",
    },
    pledge: { type: Number, default: 0 },

    wantToInvest: {
      type: Boolean,
      default: false,
    },
    wantToCashout: {
      type: Boolean,
      default: false,
    },
    downline: [
      {
        name: { type: String },
        amount: { type: Number, default: 0 },
      },
    ],
    purgeHistory: [
      {
        name: { type: String },
        amount: { type: Number },
      },
    ],
    investHistory: [
      {
        name: { type: String },
        amount: { type: Number },
      },
    ],
    guiderHistory: [
      {
        name: { type: String },
        amount: { type: Number },
      },
    ],
    cashoutHistory: [
      {
        name: { type: String },
        amount: { type: Number },
      },
    ],
  },
  { timestamps: true }
);
UserSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", UserSchema);
