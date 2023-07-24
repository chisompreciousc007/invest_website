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
const telegramHandle = process.env.TELEGRAM_HANDLE;
const { TelegramClient } = require("messaging-api-telegram");
const PostToTelegram = new TelegramClient({
  accessToken: process.env.TELEGRAM_BOT_TOKEN,
});
const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Too many accounts created from this IP, please try again after an hour",
});
// FUNCTION THAT POSTS MATCH NOTIFICATION TO TELEGRAM GROUP
const postTelegram = (phername, ghername, amount) => {
  PostToTelegram.sendMessage(
    telegramHandle,
    `${phername} have been matched to pay ${ghername} an amount of NGN${amount}.Kindly make a payment soon and upload a POP for confirmation `,
    {
      disableWebPagePreview: true,
      disableNotification: true,
    }
  );
  PostToTelegram.sendMessage(
    telegramHandle,
    `${ghername} have been matched to receive an amount of NGN${amount}. Kindly check on your dashboard for confirmation`,
    {
      disableWebPagePreview: true,
      disableNotification: true,
    }
  );
};

// VERIFY USER AND RETURN USER DATA log
router.get("/user", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
});
// GET ALL USERS(WITHOUT ADMIN VERIFICATION, FOR DEVELOPMENT ONLY)
router.get("/devOnly", async (req, res) => {
  try {
    const foundUsers = await User.find({}).exec();
    res.json(foundUsers);
  } catch (err) {
    res.json({ message: err });
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
      const len = 1;
      const randomNumber = Math.floor(Math.random() * Math.floor(len));
      const selectGuider = foundGuiders[randomNumber];
      const guiderEm = selectGuider.email;
      const guiderEmail = guiderEm.toLowerCase();
      // HASH PASSWORD
      const salt = bcrypt.genSaltSync(10);
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
        if (checkReferee !== null) {
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
        }
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

      // const postTelegram = PostToTelegram.sendMessage(
      //   telegramHandle,
      //   `${savedReceipt.pher_name} have been Successfully registered, Please proceed to pay activation fee to your guider.`,
      //   {
      //     disableWebPagePreview: true,
      //     disableNotification: true,
      //   }
      // );

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
      // const postTelegramPromise = await postTelegram;
      const editGuiderPromise = await editGuider;
      res.status(200).send(savedUser);
    } catch (err) {
      res.status(400).send(err.message);
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
      const lowercaseUsername = req.body.username.toLowerCase();
      // check if user is registered
      const user = await User.findOne({ username: lowercaseUsername });

      if (!user) return res.status(400).send("Incorrect Username or password");
      // hash password
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass)
        return res.status(400).send("Incorrect username or Password");
      //CREATE AND ASSIGN A TOKEN
      const token = jwt.sign({ _id: user._id }, process.env.SECRET, {
        expiresIn: "168h",
      });
      var now = new Date();
      now.setTime(now.getTime() + 167 * 3600 * 1000);

      res.setHeader(
        "Set-Cookie",
        `token=${token};path=/;httpOnly;expires=${now.toUTCString()}`
      );

      res.status(200).send("Logged In");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
// CHECK IF USERNAME IS TAKEN
router.post(
  "/username",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      username: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const lowercaseUsername = req.body.username.toLowerCase();
      // check if username is taken
      const user = await User.findOne({ username: lowercaseUsername });

      if (user) return res.send(true);
      if (!user) return res.send(false);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// CHECK IF PHONE IS TAKEN
router.post(
  "/phone",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      phone: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      const user = await User.findOne({ phone: req.body.phone });

      if (user) return res.send(true);
      return res.send(false);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// CHECK IF EMAIL IS TAKEN
router.post(
  "/email",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  async (req, res) => {
    try {
      const lowercaseEmail = req.body.email.toLowerCase();
      // check if email is taken
      const user = await User.findOne({ email: lowercaseEmail });

      if (user) return res.send(true);
      if (!user) return res.send(false);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// GET ALL USERS(WITH ADMIN VERIFICATION)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const foundUser = await User.find();
    res.status(200).send(foundUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET ALL USERS SHOWING ONLY ISACTIVATED & ISBLOCKED STATUS
router.get("/activatedBlockedDetails", verifyAdmin, async (req, res) => {
  try {
    const foundUser = await User.find({}, "isActivated isBlocked");
    res.status(200).send(foundUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// GET ALL USERS WITH NON_EMPTY DOWNLINES
router.get("/users-with-downlines", verifyAdmin, async (req, res) => {
  try {
    const foundUser = await User.find({ downline: { $ne: [] } }, "downline");

    res.status(200).send(foundUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// CREATE A PLEDGE
router.patch(
  "/wantToInvest",
  verifyRequest,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      _id: Joi.string().required(),
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      investAmt: Joi.number().integer().min(4999).max(200001).required(),
      pledge: Joi.number().integer().required(),
    }),
  }),
  async (req, res) => {
    try {
      // INPUTS
      const { _id: id, email, investAmt, pledge, username } = req.body;
      // CHECK IF INVEST AMT IS GREATER THAN LAST INVEST AMT
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
      const postTelegram = await PostToTelegram.sendMessage(
        telegramHandle,
        `${username} have pledge NGN${investAmt},Waiting to be merged.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Commit Request Successful");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// EDIT PASSWORD
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
          res.status(400).send(err.message);
        } else {
          res.status(200).send(result);
        }
      }
    );
  }
);

router.post(
  "/post-a-match",
  verifyAdmin,
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
      res.status(400).send(error.message);
    }
  }
);

// POST PLEDGE TO TELEGRAM
router.post(
  "/post-pledge",
  verifyAdmin,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required(),
      amount: Joi.number().integer().required(),
    }),
  }),
  async (req, res) => {
    try {
      const { email: username, amount } = req.body;
      const postTelegram = await PostToTelegram.sendMessage(
        telegramHandle,
        `${username} have pledge NGN${amount},Waiting to be merged.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Posted On Telegram");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// POST A CONFIRMATION TO TELEGRAM
router.post(
  "/post-a-confirmation",
  verifyAdmin,
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
      const { gher_name, pher_name } = req.body;
      const postTelegrm = await PostToTelegram.sendMessage(
        telegramHandle,
        `${pher_name}, your payment to ${gher_name} has been received and confirmed. `,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Posted On Telegram");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// POST A NEW USER TO TELEGRAM
router.post(
  "/post-new-user",
  verifyAdmin,
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
      const postTelegram = await PostToTelegram.sendMessage(
        telegramHandle,
        `${new_user} have been Successfully registered.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Posted On Telegram");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

// POST A NEW USER TO TELEGRAM
router.post(
  "/post-activated-user",
  verifyAdmin,
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
      const postTelegram = await PostToTelegram.sendMessage(
        telegramHandle,
        `${new_user} have been Successfully activated.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Posted On Telegram");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);

//HASH PASSWORD AND CHANGE IN DATABASE MANUALLY
//
// router.post("/hash", async (req, res) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);
//     res.status(200).send(hashedPassword);
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

module.exports = router;
