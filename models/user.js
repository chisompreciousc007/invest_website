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
    investmentConfirmed: {
      type: Boolean,
      default: false,
    },
    upline: {
      type: String,
    },
    downline: [
      {
        name: { type: String },
        amount: { type: Number, default: 0 },
      },
    ],
    // totalInvestedAmt: {
    //   type: Number,
    //   default: 0,
    // },
    // totalRecievedAmt: {
    //   type: Number,
    //   default: 0,
    // },
    pendingInvestAmt: {
      type: Number,
      default: 0,
    },
    purgedAmt: {
      type: Number,
      default: 0,
    },
    InvestAmt: {
      type: Number,
      default: 0,
    },
    pendingCashoutAmt: {
      type: Number,
      default: 0,
    },
    CashoutAmt: {
      type: Number,
      default: 0,
    },
    wantToInvest: {
      type: Boolean,
      default: false,
    },
    wantToCashout: {
      type: Boolean,
      default: false,
    },
    readyForCashout: {
      type: Boolean,
      default: false,
    },
    matchToInvest: {
      type: Boolean,
      default: false,
    },
    matchToCashout: {
      type: Boolean,
      default: false,
    },
    investList: [
      {
        accountName: { type: String },
        accountNumber: { type: String },
        bank: { type: String },
        phone: { type: String },
        amount: { type: Number },
        popPath: { type: String },
      },
    ],
    investHistory: [
      {
        accountName: { type: String },
        accountNumber: { type: String },
        bank: { type: String },
        phone: { type: String },
        amount: { type: Number },
      },
    ],
    guiderList: [
      {
        accountName: String,
        accountNumber: String,
        bank: String,
        phone: String,
        amount: Number,
        popPath: { type: String, default: "" },
      },
    ],
    cashoutList: [
      {
        name: { type: String },
        phone: { type: String },
        amount: { type: Number, default: 0 },
        popPath: { type: String },
      },
    ],
    cashoutHistory: [
      {
        name: { type: String },
        phone: { type: String },
        amount: { type: Number, default: 0 },
        popPath: { type: String },
      },
    ],
  },
  { timestamps: true }
);
UserSchema.plugin(uniqueValidator, { message: "is already taken." });

module.exports = mongoose.model("User", UserSchema);
