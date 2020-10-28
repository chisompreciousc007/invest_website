const express = require("express");
var multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./client/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + uuidv4() + path.extname(file.originalname));
  },
});
var upload = multer({ storage: storage });
const router = express.Router();
const Receipt = require("../models/receipt");
const OutstandingGher = require("../models/outstandingGher");
const OneDayGher = require("../models/1DGher");
const FourDayGher = require("../models/4DGher");
const SevenDayGher = require("../models/7DGher");
const PendingGher = require("../models/pendingGher");
const Pher = require("../models/pher");
const User = require("../models/user");
const verifyRequest = require("../verifyPerrequest");
const verifyAdmin = require("../verifyAdmin");
const { compareAsc, addHours } = require("date-fns");
require("dotenv/config");
const fs = require("fs");
const { celebrate, Joi, Segments } = require("celebrate");
const smsToken = process.env.BULK_SMS_TOKEN;
const axios = require("axios");
const telegramHandle = process.env.TELEGRAM_HANDLE;
const MATCHTOPAY_BOT_TOKEN = process.env.MATCHTOPAY_BOT_TOKEN;
const POP_BOT_TOKEN = process.env.POP_BOT_TOKEN;
const CONFIRMPAY_BOT_TOKEN = process.env.CONFIRMPAY_BOT_TOKEN;
const SUC_ACTIVATED_BOT_TOKEN = process.env.SUC_ACTIVATED_BOT_TOKEN;
const MATCHTORECEIVE_BOT_TOKEN = process.env.MATCHTORECEIVE_BOT_TOKEN;
const { TelegramClient } = require("messaging-api-telegram");
const matchToPayTelegram = new TelegramClient({
  accessToken: MATCHTOPAY_BOT_TOKEN,
});
const matchToReceiveTelegram = new TelegramClient({
  accessToken: MATCHTORECEIVE_BOT_TOKEN,
});
const successActivatedTelegram = new TelegramClient({
  accessToken: SUC_ACTIVATED_BOT_TOKEN,
});
const popTelegram = new TelegramClient({
  accessToken: POP_BOT_TOKEN,
});
const confirmPayTelegram = new TelegramClient({
  accessToken: CONFIRMPAY_BOT_TOKEN,
});
const sendSMS = (name, number) => {
  axios.post(
    `https://www.bulksmsnigeria.com/api/v1/sms/create?api_token=${smsToken}from=SplashCash&to=${number}&body=Hello ${name}, You have been matched on SplashCash247, Kindly Check your Dashboard.`
  );
};

const postTelegram = (phername, ghername, amount) => {
  matchToPayTelegram.sendMessage(
    telegramHandle,
    `${phername} have been matched to pay ${ghername} an amount of NGN${amount}.Kindly make a payment soon and upload a POP for confirmation `,
    {
      disableWebPagePreview: true,
      disableNotification: true,
    }
  );
  matchToReceiveTelegram.sendMessage(
    telegramHandle,
    `${ghername} have been matched to receive an amount of NGN${amount}. Kindly check on your dashboard for confirmation`,
    {
      disableWebPagePreview: true,
      disableNotification: true,
    }
  );
};

router.get(
  "/foruser/:email",
  verifyRequest,
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      email: Joi.string().required(),
    }),
  }),
  async (req, res) => {
    try {
      // INPUTS
      const { email } = req.params;
      const receipt = await Receipt.find({
        $or: [{ gher_email: email }, { pher_email: email }],
      });
      const phstatus = await Pher.findOne({ email: email }, "email amount");
      const oneDayGher = await OneDayGher.findOne(
        { email: req.params.email },
        "amount"
      );
      const fourDayGher = await FourDayGher.findOne(
        { email: req.params.email },
        "amount"
      );
      const sevenDayGher = await SevenDayGher.findOne(
        { email: req.params.email },
        "amount"
      );
      const verify = (v) => {
        if (v === null) return 0;
        return v.amount;
      };
      const totalAmt =
        verify(oneDayGher) + verify(fourDayGher) + verify(sevenDayGher);

      const phReceiptArr = receipt.filter(
        (el) => el.pher_email === email && el.isActivationFee === false
      );
      const ghReceiptArr = receipt.filter(
        (el) => el.gher_email === email && el.isActivationFee === false
      );
      const guiderReceiptArr = receipt.filter(
        (el) => el.gher_email === email && el.isActivationFee === true
      );
      const feeArr = receipt.filter(
        (el) => el.pher_email === email && el.isActivationFee === true
      );
      const feeObj = feeArr[0];
      const resultObj1 = {
        payArr: phReceiptArr,
        getArr: ghReceiptArr,
        guiderArr: guiderReceiptArr,
        activationFee: feeObj,
        email: email,
        ghStatus: {},
        phStatus: phstatus,
      };
      const resultObj2 = {
        payArr: phReceiptArr,
        getArr: ghReceiptArr,
        guiderArr: guiderReceiptArr,
        activationFee: feeObj,
        email: email,
        ghStatus: { email: req.params.email, amount: totalAmt },
        phStatus: phstatus,
      };

      if (totalAmt === 0) return res.status(200).json(resultObj1);
      if (totalAmt !== 0) return res.status(200).json(resultObj2);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

router.patch(
  "/confirmpayment/",
  verifyRequest,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      gher_email: Joi.string().email().required(),
      pher_email: Joi.string().email().required(),
      pher_name: Joi.string().required(),
      _id: Joi.string().required(),
      amount: Joi.number().integer().required(),
      __v: Joi.number().integer(),
      createdAt: Joi.date().required(),
      gher_accountName: Joi.string().required(),
      gher_accountNo: Joi.string().required(),
      gher_bank: Joi.string().required(),
      gher_name: Joi.string().required(),
      gher_phone: Joi.string().required(),
      isActivationFee: Joi.boolean().required(),
      pher_phone: Joi.string().required(),
      popImage: Joi.object().required(),
      updatedAt: Joi.date(),
    }),
  }),
  async (req, res) => {
    try {
      // INPUTS
      const {
        gher_email,
        pher_email,
        pher_name,
        gher_name,
        _id: receiptId,
        popPath,
        amount,
      } = req.body;
      const oneuser = await User.findOne(
        { email: pher_email },
        "pledge upline"
      );
      const { pledge, upline } = oneuser;
      // UPDATE HISTORY OF GHER AND PHER
      const addToPherHistory = await User.findOneAndUpdate(
        { email: pher_email },
        {
          $push: {
            investHistory: {
              name: gher_name,
              amount: amount,
            },
          },
        }
      );
      const addToGherHistory = await User.findOneAndUpdate(
        { email: gher_email },
        {
          $push: {
            cashoutHistory: {
              name: pher_name,
              amount: amount,
            },
          },
        }
      );
      // AMOUNT EQUAL PLEDGE
      //
      if (amount >= pledge) {
        // CREATE NEW GH FOR ALL DAYS
        const createOneDayGher = new OneDayGher({
          email: pher_email,
          amount: amount * 0.5,
        }).save();
        const createFourDayGher = new FourDayGher({
          email: pher_email,
          amount: amount * 0.5,
        }).save();
        const createSevenDayGher = new SevenDayGher({
          email: pher_email,
          amount: amount * 0.5,
        }).save();
        const createOneDayGherPromise = createOneDayGher;
        const createFourDayGherPromise = createFourDayGher;
        const createSevenDayGherPromise = createSevenDayGher;
      } else {
        //// CHECK PENDING GHER
        const existingPendingGher = await PendingGher.findOne({
          email: pher_email,
        });
        if (existingPendingGher === null) {
          //  CREATE NEW GHER
          const createPendingGherCollection = await new PendingGher({
            email: pher_email,
            amount: amount,
          }).save();
        }
        if (existingPendingGher !== null) {
          // increment gher
          const increasePendingGher = await PendingGher.findOneAndUpdate(
            { email: pher_email },
            { $inc: { amount: amount } },
            { new: true }
          );
          // check if fulfilled
          const pendingGherIsFulfilled = increasePendingGher.amount >= pledge;
          if (pendingGherIsFulfilled) {
            // CREATE NEW GH FOR ALL DAYS
            const createOneDayGher = new OneDayGher({
              email: pher_email,
              amount: pledge * 0.5,
            }).save();
            const createFourDayGher = new FourDayGher({
              email: pher_email,
              amount: pledge * 0.5,
            }).save();
            const createSevenDayGher = new SevenDayGher({
              email: pher_email,
              amount: pledge * 0.5,
            }).save();
            const createOneDayGherPromise = createOneDayGher;
            const createFourDayGherPromise = createFourDayGher;
            const createSevenDayGherPromise = createSevenDayGher;
            const deletePendingGher = await PendingGher.findOneAndDelete({
              email: pher_email,
            });
          } else {
          }
        }
      }
      if (upline !== "new") {
        const isThere = await User.find({
          username: upline,
          "downline.name": pher_name,
        });
        if (isThere.length === 0) {
          const updateDownline = await User.findOneAndUpdate(
            { username: upline },
            {
              $push: {
                downline: {
                  name: pher_name,
                  amount: pledge * 0.05,
                },
              },
            }
          );
        } else {
        }
      }
      const deleteReceipt = await Receipt.findByIdAndDelete(receiptId);
      const postTelegrm = await confirmPayTelegram.sendMessage(
        telegramHandle,
        `${pher_name}, your payment to ${gher_name} has been received and confirmed.Thanks for investing in SPLASHCASH,Get ready to be splashed. `,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      res.status(200).send("Payment Confirmed!");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
router.patch(
  "/confirmfee/",
  verifyRequest,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      gher_email: Joi.string().email().required(),
      pher_email: Joi.string().email().required(),
      pher_name: Joi.string().required(),
      _id: Joi.string().required(),
      amount: Joi.number().integer().required(),
      __v: Joi.number().integer(),
      createdAt: Joi.date().required(),
      gher_accountName: Joi.string().required(),
      gher_accountNo: Joi.string().required(),
      gher_bank: Joi.string().required(),
      gher_name: Joi.string().required(),
      gher_phone: Joi.string().required(),
      isActivationFee: Joi.boolean().required(),
      pher_phone: Joi.string().required(),
      popImage: Joi.object().required(),
      updatedAt: Joi.date(),
    }),
  }),
  async (req, res) => {
    try {
      // INPUTS
      const {
        gher_email,
        pher_email,
        amount,
        _id: receiptId,
        pher_name,
      } = req.body;
      // SET PHER TO ISACTIVATED
      const activateNewUser = await User.findOneAndUpdate(
        { email: pher_email },
        {
          isActivated: true,
        },
        { new: true, runValidators: true, context: "query" }
      );
      // ADD TO GUIDER
      const addToGuiderHistory = await User.findOneAndUpdate(
        { email: gher_email },
        {
          $push: {
            guiderHistory: {
              name: pher_name,
              amount: amount,
            },
          },
        },
        { new: true, runValidators: true, context: "query" }
      );
      // POST ON TELEGRAM
      const activationpostTelegram = successActivatedTelegram.sendMessage(
        telegramHandle,
        `${pher_name} have been Successfully activated, Proceed to splash your cash so that you can be splashed.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
      // DELETE RECEIPTTTTTT
      const deleteFeeReceipt = Receipt.findByIdAndDelete(receiptId);
      const postTelegramPromise = await activationpostTelegram;
      const deleteFeeReceiptPromise = await deleteFeeReceipt;

      res.status(200).send("Payment Confirmed");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
);
router.patch(
  "/purge",
  verifyRequest,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      gher_email: Joi.string().email().required(),
      pher_email: Joi.string().email().required(),
      pher_name: Joi.string().required(),
      _id: Joi.string().required(),
      amount: Joi.number().integer().required(),
      __v: Joi.number().integer(),
      createdAt: Joi.date().required(),
      gher_accountName: Joi.string().required(),
      gher_accountNo: Joi.string().required(),
      gher_bank: Joi.string().required(),
      gher_name: Joi.string().required(),
      gher_phone: Joi.string().required(),
      isActivationFee: Joi.boolean().required(),
      pher_phone: Joi.string().required(),
      popImage: Joi.object().required(),
      updatedAt: Joi.date(),
    }),
  }),
  async (req, res) => {
    try {
      const {
        _id: receiptId,
        gher_email,
        pher_email,
        pher_name,
        amount,
        isActivationFee,
        createdAt,
      } = req.body;

      const expDate = addHours(new Date(createdAt), 8);
      const timecompare = compareAsc(new Date(), expDate);
      if (timecompare != 1) {
        return res.status(400).send("Kindly Wait Until deadline before Purge");
      }
      if (isActivationFee) {
        const blockPher = await User.findOneAndUpdate(
          { email: pher_email },
          { isBlocked: true }
        );
        const addToGherPurgeHistory = await User.findOneAndUpdate(
          { email: gher_email },
          {
            $push: {
              purgeHistory: {
                name: pher_name,
                amount: amount,
              },
            },
          }
        );
        const deleteReceipt = await Receipt.findByIdAndDelete(receiptId);
        res.status(200).send("Payment Purged");
      } else {
        // PAYMENT PURGE
        const blockPher = await User.findOneAndUpdate(
          { email: pher_email },
          { isBlocked: true }
        );
        //  MOVE TO OUTSTANDING GHER
        const moveToOutstandingGher = await new OutstandingGher(
          { email: gher_email },
          { amount: amount }
        ).save();
        // DELETE RECEIPT
        const deleteReceipt = await Receipt.findByIdAndDelete(receiptId);
        res.status(200).send("Payment Purged");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const foundReceipt = await Receipt.find({}, "gher_email pher_email amount");
    res.json(foundReceipt);
  } catch (err) {
    res.json({ message: err });
  }
});
router.post(
  "/upload-pop/:id",
  verifyRequest,
  upload.single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;
      var image = fs.readFileSync(req.file.path);
      var encode_image = image.toString("base64");
      var finalImage = {
        contentType: req.file.mimetype,
        path: req.file.path,
        data: Buffer.from(encode_image, "base64"),
      };

      const updateReceipt = await Receipt.findByIdAndUpdate(
        id,
        {
          popImage: finalImage,
        },
        { new: true }
      );
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("image deleted");
        }
      });
      res.status(200).send("POP Upload Successful!!");
      // POST ON TELEGRAM
      const activationpostTelegram = await popTelegram.sendMessage(
        telegramHandle,
        `${updateReceipt.pher_name} have paid and successfully uploaded a POP , Please wait to be confirmed.`,
        {
          disableWebPagePreview: true,
          disableNotification: true,
        }
      );
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

router.post("/new", async (req, res) => {
  try {
    const {
      gher_name,
      gher_email,
      gher_accountName,
      gher_accountNo,
      gher_bank,
      gher_phone,
      pher_name,
      pher_email,
      pher_phone,
      amount,
      isActivationFee,
    } = req.body;
    let obj = {
      gher_name: gher_name,
      gher_email: gher_email,
      gher_accountName: gher_accountName,
      gher_accountNo: gher_accountNo,
      gher_bank: gher_bank,
      gher_phone: gher_phone,
      pher_name: pher_name,
      pher_email: pher_email,
      pher_phone: pher_phone,
      amount: amount,
      isActivationFee: isActivationFee,
    };
    const makeReceipt = await new Receipt(obj).save();
    res.send(makeReceipt);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/automatch-1DayGher", verifyAdmin, async (req, res) => {
  // INPUTS
  const matchAuto = async () => {
    try {
      const gherSorted = await OneDayGher.find({
        createdAt: {
          $lte: new Date(new Date().getTime() - 23 * 60 * 60 * 1000),
        },
      })
        .sort({
          updatedAt: 1,
        })
        .exec();
      const pherSorted = await Pher.find({})
        .sort({
          updatedAt: 1,
        })
        .exec();
      if (!gherSorted.length)
        return res.status(200).send("Empty Gher Collection");
      if (!pherSorted.length)
        return res.status(200).send("Empty Pher Collection");
      var {
        amount: firstGherAmt,
        _id: firstGherID,
        email: firstGherEmail,
      } = gherSorted[0];
      var {
        amount: firstPherAmt,
        _id: firstPherID,
        email: firstPherEmail,
      } = pherSorted[0];

      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });
      let obj = {
        gher_name: gh.name,
        gher_email: gh.email,
        gher_accountName: gh.accountName,
        gher_accountNo: gh.accountNo,
        gher_bank: gh.bank,
        gher_phone: gh.phone,
        pher_name: ph.name,
        pher_email: ph.email,
        pher_phone: ph.phone,
        amount: firstPherAmt,
        isActivationFee: false,
      };
      const makeReceipt = await new Receipt(obj).save();
      // SEND TEXT AND TELEGRAM
      const waitSMS = sendSMS(makeReceipt.pher_name, makeReceipt.pher_phone);
      const waitForTeegram = postTelegram(
        makeReceipt.pher_name,
        makeReceipt.gher_name,
        makeReceipt.amount
      );

      if (firstGherAmt == firstPherAmt) {
        const deletePairedGher = await OneDayGher.findByIdAndDelete(
          firstGherID
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
      }
      if (firstPherAmt < firstGherAmt) {
        const updateGherBalance = await OneDayGher.findByIdAndUpdate(
          firstGherID,
          {
            $inc: { amount: -firstPherAmt },
          }
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
      }
      if (firstPherAmt > firstGherAmt) {
        // PHERAMT > GHERAMT

        const updatePherBalance = await Pher.findByIdAndUpdate(firstPherID, {
          $inc: { amount: -firstGherAmt },
          isPaired: false,
        });
        const deletePairedGher = await OneDayGher.findByIdAndDelete(
          firstGherID
        );
      }
      // RERUN;
      matchAuto();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  matchAuto();
});
router.get("/automatch-4DayGher", verifyAdmin, async (req, res) => {
  // INPUTS
  const matchAuto = async () => {
    try {
      const gherSorted = await FourDayGher.find({
        createdtedAt: {
          $lte: new Date(new Date().getTime() - 4 * 24 * 60 * 60 * 1000),
        },
      })
        .sort({
          updatedAt: 1,
        })
        .exec();
      const pherSorted = await Pher.find({})
        .sort({
          updatedAt: 1,
        })
        .exec();
      if (!gherSorted.length)
        return res.status(200).send("Empty Gher Collection");
      if (!pherSorted.length)
        return res.status(200).send("Empty Pher Collection");
      var {
        amount: firstGherAmt,
        _id: firstGherID,
        email: firstGherEmail,
      } = gherSorted[0];
      var {
        amount: firstPherAmt,
        _id: firstPherID,
        email: firstPherEmail,
      } = pherSorted[0];

      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });
      let obj = {
        gher_name: gh.name,
        gher_email: gh.email,
        gher_accountName: gh.accountName,
        gher_accountNo: gh.accountNo,
        gher_bank: gh.bank,
        gher_phone: gh.phone,
        pher_name: ph.name,
        pher_email: ph.email,
        pher_phone: ph.phone,
        amount: firstPherAmt,
        isActivationFee: false,
      };
      const makeReceipt = await new Receipt(obj).save();
      // SEND TEXT AND TELEGRAM
      const waitSMS = sendSMS(makeReceipt.pher_name, makeReceipt.pher_phone);
      const waitForTeegram = await postTelegram(
        makeReceipt.pher_name,
        makeReceipt.gher_name,
        makeReceipt.amount
      );
      if (firstGherAmt == firstPherAmt) {
        const deletePairedGher = await FourDayGher.findByIdAndDelete(
          firstGherID
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);

        // res.status(200).send("success");
      }
      if (firstPherAmt < firstGherAmt) {
        const updateGherBalance = await FourDayGher.findByIdAndUpdate(
          firstGherID,
          {
            $inc: { amount: -firstPherAmt },
          }
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);

        // res.status(200).send("success");
      }
      if (firstPherAmt > firstGherAmt) {
        // PHERAMT > GHERAMT

        const updatePherBalance = await Pher.findByIdAndUpdate(firstPherID, {
          $inc: { amount: -firstGherAmt },
          isPaired: false,
        });
        const deletePairedGher = await FourDayGher.findByIdAndDelete(
          firstGherID
        );

        // res.status(200).send("success");
      }
      // RERUN;
      matchAuto();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  matchAuto();
});
router.get("/automatch-7DayGher", verifyAdmin, async (req, res) => {
  // INPUTS
  const matchAuto = async () => {
    try {
      const gherSorted = await SevenDayGher.find({
        createdAt: {
          $lte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        },
      })
        .sort({
          updatedAt: 1,
        })
        .exec();
      const pherSorted = await Pher.find({})
        .sort({
          updatedAt: 1,
        })
        .exec();
      if (!gherSorted.length)
        return res.status(200).send("Empty Gher Collection");
      if (!pherSorted.length)
        return res.status(200).send("Empty Pher Collection");
      var {
        amount: firstGherAmt,
        _id: firstGherID,
        email: firstGherEmail,
      } = gherSorted[0];
      var {
        amount: firstPherAmt,
        _id: firstPherID,
        email: firstPherEmail,
      } = pherSorted[0];

      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });
      let obj = {
        gher_name: gh.name,
        gher_email: gh.email,
        gher_accountName: gh.accountName,
        gher_accountNo: gh.accountNo,
        gher_bank: gh.bank,
        gher_phone: gh.phone,
        pher_name: ph.name,
        pher_email: ph.email,
        pher_phone: ph.phone,
        amount: firstPherAmt,
        isActivationFee: false,
      };
      const makeReceipt = await new Receipt(obj).save();
      // SEND TEXT AND TELEGRAM
      const waitSMS = sendSMS(makeReceipt.pher_name, makeReceipt.pher_phone);
      const waitForTeegram = await postTelegram(
        makeReceipt.pher_name,
        makeReceipt.gher_name,
        makeReceipt.amount
      );
      if (firstGherAmt == firstPherAmt) {
        const deletePairedGher = await SevenDayGher.findByIdAndDelete(
          firstGherID
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
      }
      if (firstPherAmt < firstGherAmt) {
        const updateGherBalance = await SevenDayGher.findByIdAndUpdate(
          firstGherID,
          {
            $inc: { amount: -firstPherAmt },
          }
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
      }
      if (firstPherAmt > firstGherAmt) {
        const updatePherBalance = await Pher.findByIdAndUpdate(firstPherID, {
          $inc: { amount: -firstGherAmt },
          isPaired: false,
        });
        const deletePairedGher = await SevenDayGher.findByIdAndDelete(
          firstGherID
        );
      }
      // RERUN;
      matchAuto();
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  matchAuto();
});

router.get("/automatch-outGher", verifyAdmin, async (req, res) => {
  // INPUTS
  const matchAuto = async () => {
    try {
      const gherSorted = await OutstandingGher.find({
        // createdAt: {
        //   $lte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
        // },
      })
        .sort({
          updatedAt: 1,
        })
        .exec();
      const pherSorted = await Pher.find({})
        .sort({
          updatedAt: 1,
        })
        .exec();
      if (!gherSorted.length)
        return res.status(200).send("Empty Gher Collection");
      if (!pherSorted.length)
        return res.status(200).send("Empty Pher Collection");
      var {
        amount: firstGherAmt,
        _id: firstGherID,
        email: firstGherEmail,
      } = gherSorted[0];
      var {
        amount: firstPherAmt,
        _id: firstPherID,
        email: firstPherEmail,
      } = pherSorted[0];

      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });
      let obj = {
        gher_name: gh.name,
        gher_email: gh.email,
        gher_accountName: gh.accountName,
        gher_accountNo: gh.accountNo,
        gher_bank: gh.bank,
        gher_phone: gh.phone,
        pher_name: ph.name,
        pher_email: ph.email,
        pher_phone: ph.phone,
        amount: firstPherAmt,
        isActivationFee: false,
      };
      const makeReceipt = await new Receipt(obj).save();
      // SEND TEXT AND TELEGRAM
      const waitSMS = sendSMS(makeReceipt.pher_name, makeReceipt.pher_phone);
      const waitForTeegram = await postTelegram(
        makeReceipt.pher_name,
        makeReceipt.gher_name,
        makeReceipt.amount
      );
      if (firstGherAmt == firstPherAmt) {
        const deletePairedGher = await OutstandingGher.findByIdAndDelete(
          firstGherID
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
      }
      if (firstPherAmt < firstGherAmt) {
        const updateGherBalance = await OutstandingGher.findByIdAndUpdate(
          firstGherID,
          {
            $inc: { amount: -firstPherAmt },
          }
        );
        const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
      }
      if (firstPherAmt > firstGherAmt) {
        const updatePherBalance = await Pher.findByIdAndUpdate(firstPherID, {
          $inc: { amount: -firstGherAmt },
          isPaired: false,
        });
        const deletePairedGher = await OutstandingGher.findByIdAndDelete(
          firstGherID
        );
      }
      // RERUN;
      matchAuto();
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
  matchAuto();
});

router.get(
  "/match-user",
  verifyAdmin,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      amount: Joi.number().integer().min(4999).max(200001).required(),
    }),
  }),
  async (req, res) => {
    // INPUTS
    const matchAuto = async () => {
      try {
        const { email: firstGherEmail, amount: firstGherAmt } = req.body;
        const pherSorted = await Pher.find({})
          .sort({
            updatedAt: 1,
          })
          .exec();
        if (!pherSorted.length)
          return res.status(200).send("Empty Pher Collection");
        var {
          amount: firstPherAmt,
          _id: firstPherID,
          email: firstPherEmail,
        } = pherSorted[0];

        const gh = await User.findOne({ email: firstGherEmail });
        const ph = await User.findOne({ email: firstPherEmail });
        let obj = {
          gher_name: gh.name,
          gher_email: gh.email,
          gher_accountName: gh.accountName,
          gher_accountNo: gh.accountNo,
          gher_bank: gh.bank,
          gher_phone: gh.phone,
          pher_name: ph.name,
          pher_email: ph.email,
          pher_phone: ph.phone,
          amount: firstPherAmt,
          isActivationFee: false,
        };
        const makeReceipt = await new Receipt(obj).save();
        // SEND TEXT AND TELEGRAM
        const waitSMS = sendSMS(makeReceipt.pher_name, makeReceipt.pher_phone);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );
        if (firstGherAmt == firstPherAmt) {
          const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
        }
        if (firstPherAmt < firstGherAmt) {
          const deletePairedPher = await Pher.findByIdAndDelete(firstPherID);
        }
        if (firstPherAmt > firstGherAmt) {
          const updatePherBalance = await Pher.findByIdAndUpdate(firstPherID, {
            $inc: { amount: -firstGherAmt },
            isPaired: false,
          });
        }
      } catch (error) {
        res.status(400).send({ message: error.message });
      }
    };
    matchAuto();
  }
);

module.exports = router;
