const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Pher = require("../models/pher");
const Guider = require("../models/guider");
const OutstandingGher = require("../models/outstandingGher");
const OneDayGher = require("../models/1DGher");
const FourDayGher = require("../models/4DGher");
const SevenDayGher = require("../models/7DGher");
const verify = require("../verifytoken");
const verifyRequest = require("../verifyPerrequest");
const verifyAdmin = require("../verifyAdmin");
const Receipt = require("../models/receipt");
const { celebrate, Joi, Segments } = require("celebrate");
require("dotenv/config");
const rateLimit = require("express-rate-limit");
const BOT_TOKEN = process.env.BOT_TOKEN;
const { TelegramClient } = require("messaging-api-telegram");
const clientTelegram = new TelegramClient({
  accessToken: BOT_TOKEN,
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});

const postTelegram = (phername, ghername, amount) => {
  clientTelegram.sendMessage(
    "@splash_cash247",
    `${phername} have been matched to pay ${ghername} an amount of NGN${amount}.Kindly make a payment soon and upload a POP for confirmation `,
    {
      disableWebPagePreview: true,
      disableNotification: true,
    }
  );
  clientTelegram.sendMessage(
    "@splash_cash247",
    `${ghername} have been matched to receive an amount of NGN${amount}. Kindly check on your dashboard for confirmation`,
    {
      disableWebPagePreview: true,
      disableNotification: true,
    }
  );
};
// VERIFY USER AND RETURN USER DATA
router.get("/user", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// CREATE USER
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      phone: Joi.string().required(),
      upline: Joi.string().required(),
      accountNo: Joi.string().required(),
      accountName: Joi.string().required(),
      bank: Joi.string().required(),
    }),
  }),
  createAccountLimiter,
  async (req, res) => {
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
      res.json(savedUser);
    } catch (err) {
      res.json({ message: err.message });
    }
  }
);
//LOGIN

router.post(
  "/login",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),

      password: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      // check if user is registered
      const user = await User.findOne({ username: req.body.username });

      if (!user) return res.status(400).send("Incorrect username or password");

      // hash password
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass)
        return res.status(400).send("Incorrect username or password");
      //CREATE AND ASSIGN A TOKEN
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "24h",
      });

      // res.setHeader("set-cookie", [`jwtToken=${token}`]);

      res.status(200).send(token);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

router.post(
  "/username",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      // check if username is taken
      const user = await User.findOne({ username: req.body.username });

      if (user) return res.send(true);
      if (!user) return res.send(false);
    } catch (error) {
      res.json({ message: err });
    }
  }
);
router.post(
  "/phone",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      // check if username is taken
      const user = await User.findOne({ phone: req.body.phone });

      if (user) return res.send(true);
      return res.send(false);
    } catch (error) {
      res.json({ message: error });
    }
  }
);
router.post(
  "/email",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  async (req, res) => {
    try {
      // check if email is taken
      const user = await User.findOne({ email: req.body.email });

      if (user) return res.send(true);
      if (!user) return res.send(false);
    } catch (error) {
      res.json({ message: error });
    }
  }
);
router.get("/all-details", verifyAdmin, async (req, res) => {
  try {
    const foundUser = await User.find();
    res.json(foundUser);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const foundUser = await User.find({}, "isActivated isBlocked");
    res.json(foundUser);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/users-with-downlines", verifyAdmin, async (req, res) => {
  try {
    const foundUser = await User.find({ downline: { $ne: [] } }, "downline");

    res.json(foundUser);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch(
  "/wantToInvest",
  verifyRequest,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().required(),
      email: Joi.string().email().required(),
      investAmt: Joi.number().integer().min(4999).max(200001).required(),
      pledge: Joi.number().integer().required(),
    }),
  }),
  async (req, res) => {
    try {
      // INPUTS
      const { _id: id, email, investAmt, pledge } = req.body;
      if (pledge > investAmt) {
        return res
          .status(400)
          .send(`Investment must be equal or greater than ${pledge}`);
      }
      // CHECK IF THERE IS PENDING TRANSACTION
      const checkForPher = await Pher.findOne({
        email: email,
      });
      const checkOneDayGher = await OneDayGher.findOne({
        email: email,
      });
      const checkFourDayGher = await FourDayGher.findOne({ email: email });
      const checkSevenDayGher = await SevenDayGher.findOne({ email: email });
      const checkOutstandingGher = await OutstandingGher.findOne({
        email: email,
      });
      if (
        checkForPher !== null ||
        checkOneDayGher !== null ||
        checkFourDayGher !== null ||
        checkSevenDayGher !== null ||
        checkOutstandingGher !== null
      ) {
        return res
          .status(400)
          .send(
            `You have a pending transaction(GH/PH) so you cannot invest yet`
          );
      }

      const updatedUser = await User.findByIdAndUpdate(id, {
        pledge: investAmt,
      });
      const createPher = await new Pher({
        email: email,
        amount: investAmt,
      }).save();
      res.status(200).send("Commit Request Successful");
    } catch (error) {
      console.log("error from submit amount");
      res.status(400).send(error.message);
    }
  }
);
router.patch(
  "/password/:id",
  verifyRequest,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  async (req, res) => {
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
  }
);
router.patch(
  "/message",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      text: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    const { email, username, text } = req.body;
    try {
      const postTelegram = clientTelegram.sendMessage(
        "@splash_cash247",
        `email:${email}
        username:${username}
        message: ${text}.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res
        .status(200)
        .send(
          "Your Message Have been sent,We will write back to your email shortly.You can also get to us on WhatsApp."
        );
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

router.post(
  "/post-a-match",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      gher_name: Joi.string().required().allow(null),
      pher_name: Joi.string().required().allow(null),
      amount: Joi.number().integer().required().allow(null),
      new_user: Joi.string().required().allow(null),
    }),
  }),
  async (req, res) => {
    try {
      const { gher_name, pher_name, amount, new_user } = req.body;
      const postTelegram1 = postTelegram(pher_name, gher_name, amount);
      res.status(200).send("Posted On Telegram");
    } catch (error) {
      res.json({ message: err });
    }
  }
);
router.post(
  "/post-new-user",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      gher_name: Joi.string().required().allow(null),
      pher_name: Joi.string().required().allow(null),
      amount: Joi.number().integer().required().allow(null),
      new_user: Joi.string().required().allow(null),
    }),
  }),
  async (req, res) => {
    try {
      const { new_user } = req.body;
      const postTelegram = await clientTelegram.sendMessage(
        "@splash_cash247",
        `${new_user} have been Successfully registered, Please proceed to pay activation fee to your guider.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Posted On Telegram");
    } catch (error) {
      res.json({ message: err });
    }
  }
);
router.post(
  "/post-activated-user",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      gher_name: Joi.string().required().allow(null),
      pher_name: Joi.string().required().allow(null),
      amount: Joi.number().integer().required().allow(null),
      new_user: Joi.string().required().allow(null),
    }),
  }),
  async (req, res) => {
    try {
      const { new_user } = req.body;
      const postTelegram = await clientTelegram.sendMessage(
        "@splash_cash247",
        `${new_user} have been Successfully activated, Proceed to splash your cash so that you can be splashed.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Posted On Telegram");
    } catch (error) {
      res.json({ message: err });
    }
  }
);

module.exports = router;
