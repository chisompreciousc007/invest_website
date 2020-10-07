const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Pher = require("../models/pher");
const Gher = require("../models/gher");
const Guider = require("../models/guider");
const verify = require("../verifytoken");
const { loginValidation } = require("../validation");
const { findOne } = require("../models/user");
const Receipt = require("../models/receipt");
const Committer = require("../models/committer");
const Nexmo = require("nexmo");
const { addHours, format } = require("date-fns");
require("dotenv/config");
const BOT_TOKEN = process.env.BOT_TOKEN;
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const autheToken = process.env.TWILIO_AUTHE_TOKEN;
// const client = require("twilio")(accountSid, autheToken);
const { TelegramClient } = require("messaging-api-telegram");
const clientTelegram = new TelegramClient({
  accessToken: BOT_TOKEN,
});
// VERIFY USER AND RETURN USER DATA
router.get("/user", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});
// CREATE USER
router.post("/", async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      password,
      phone,
      upline,
      accountName,
      accountNo,
      bank,
    } = req.body;
    const foundGuiders = await Guider.find({});
    const randomNumber = Math.floor(
      Math.random() * Math.floor(foundGuiders.length)
    );
    const selectGuider = foundGuiders[randomNumber];
    const guiderEmail = selectGuider.email;
    console.log(
      `selected random guider ${guiderEmail} out of ${foundGuiders.length} `
    );
    // HASH PASSWORD
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // SAVE USER ON DB

    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      phone: phone,
      upline: upline,
      accountName: accountName,
      accountNo: accountNo,
      bank: bank,
    });
    const savedUser = await newUser.save();
    console.log("new User saved");

    // UPDATE REFERRALS

    if (upline !== "new") {
      const checkReferee = await User.findOne({ username: upline });
      const editReferee = await User.findOneAndUpdate(
        { username: upline },
        {
          $push: {
            downline: {
              name: name,
            },
          },
        },
        { new: true, runValidators: true, context: "query" }
      );
      console.log("Referal Updated");
    }

    // CREATE RECEIPT FOR ACTIVATION FEE
    const gh = await User.findOne({ email: guiderEmail });
    const newReceipt = new Receipt({
      gher_name: gh.name,
      gher_email: gh.email,
      gher_accountName: gh.accountName,
      gher_accountNo: gh.accountNo,
      gher_bank: gh.bank,
      gher_phone: gh.phone,
      pher_name: name,
      pher_email: email,
      pher_phone: phone,
      amount: 1000,
      isActivationFee: true,
    });
    const savedReceipt = await newReceipt.save();
    console.log("Fee Receipt Generated");

    const postTelegram = clientTelegram.sendMessage(
      "@splash_cash247",
      `${savedReceipt.pher_name} have been Successfully registered, Please proceed to pay activation fee to your guider.`,
      {
        disableWebPagePreview: true,
        disableNotification: true,
      }
    );

    // UPDATE GUIDER MaTCH ARRAY
    const editGuider = User.findOneAndUpdate(
      { email: guiderEmail },
      {
        $push: {
          guiderMatch: {
            name: name,
          },
        },
      },
      { new: true, runValidators: true, context: "query" }
    );
    const postTelegramPromise = await postTelegram;
    const editGuiderPromise = await editGuider;
    console.log("Telegram Posted");
    console.log("guiderMatch Updated");
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});
//LOGIN
router.post("/login", async (req, res) => {
  //validate data before sending
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if user is registered
  const user = await User.findOne({ username: req.body.username });

  if (!user) return res.status(400).send("username not found");

  // hash password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect password");
  //CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
    expiresIn: "24h",
  });

  // res.setHeader("set-cookie", [`jwtToken=${token}`]);

  res.status(200).send(token);
});

router.post("/username", async (req, res) => {
  // check if username is taken
  console.log(req.body.username);
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.send(true);
  if (!user) return res.send(false);
});
router.post("/phone", async (req, res) => {
  // check if username is taken
  const user = await User.findOne({ phone: req.body.phone });

  if (user) return res.send(true);
  return res.send(false);
});
router.post("/email", async (req, res) => {
  // check if email is taken
  const user = await User.findOne({ email: req.body.email });

  if (user) return res.send(true);
  if (!user) return res.send(false);
});
router.get("/", async (req, res) => {
  try {
    const foundUser = await User.find();
    res.json(foundUser);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/wantToInvest", async (req, res) => {
  try {
    // INPUTS
    const { _id: id, email, investAmt } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        pledge: investAmt,
        wantToInvest: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("Pledge/ wantToInvest Updated");
    const checkDB = await Pher.findOne({ email: email });
    if (!checkDB) {
      const createPher = await new Pher({
        email: email,
        amount: investAmt,
      }).save();
      console.log("Created Pher for User");
      res.json(createPher);
    } else {
      const updatePher = await Pher.findOneAndUpdate(
        {
          email: email,
        },
        { amount: investAmt, isPaired: false }
      );
      console.log("Updated Pher Amt for User");
      res.json(updatePher);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/password/:id", async (req, res) => {
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await User.findByIdAndUpdate(
    req.params.id,
    {
      password: hashedPassword,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
