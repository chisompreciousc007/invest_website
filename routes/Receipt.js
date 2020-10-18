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
const Gher = require("../models/gher");
const PendingGher = require("../models/pendingGher");
const Pher = require("../models/pher");
const User = require("../models/user");
const Committer = require("../models/committer");
const verifyRequest = require("../verifyPerrequest");
const verifyAdmin = require("../verifyAdmin");
const { compareAsc, addHours } = require("date-fns");
require("dotenv/config");
const fs = require("fs");
const { celebrate, Joi, Segments } = require("celebrate");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const autheToken = process.env.TWILIO_AUTHE_TOKEN;
const client = require("twilio")(accountSid, autheToken);
const BOT_TOKEN = process.env.BOT_TOKEN;
const { TelegramClient } = require("messaging-api-telegram");
const clientTelegram = new TelegramClient({
  accessToken: BOT_TOKEN,
});

const sendSMS = (name, number) =>
  client.messages.create({
    body: `Hello ${name}, You have been matched on SplashCash247, Kindly Check your Dashboard.`,
    from: "+12059646173",
    to: number,
  });

const postTelegram = (phername, ghername, amount) =>
  clientTelegram.sendMessage(
    "@splash_cash247",
    `${phername} have been matched to pay ${ghername} an amount of NGN${amount}.`,
    {
      disableWebPagePreview: true,
      disableNotification: true,
    }
  );
const setWantToInvest = (email, boolean) => {
  if (boolean === true) {
    return User.findOneAndUpdate({ email: email }, { wantToInvest: true });
    // console.log("User set wantToInvest:true");
  }
  if (boolean === false) {
    return User.findOneAndUpdate({ email: email }, { wantToInvest: false });
  }
};
const setCommitIsFulfilled = (email, boolean) => {
  if (boolean === true) {
    return Committer.findOneAndUpdate({ email: email }, { isFufilled: true });
  }
  if (boolean === false) {
    return Committer.findOneAndUpdate({ email: email }, { isFufilled: false });
  }
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
      const resultObj = {
        payArr: phReceiptArr,
        getArr: ghReceiptArr,
        guiderArr: guiderReceiptArr,
        activationFee: feeObj,
        email: email,
      };
      res.status(200).json(resultObj);
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
      console.log("Pher's investHistory Updated");
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
      console.log("Gher's cashoutHistory Updated");

      const exist = await Committer.findOne({ email: pher_email });

      // FIRST TIME COMMIT && AMOUNT EQUAL PLEDGE
      //
      if (exist === null && amount >= pledge) {
        console.log("no old commit && commit equals pledge");
        // CREATE NEW COMMIT
        const newCommitter = new Committer({
          email: pher_email,
          amount: amount,
        });
        const savedCommit = await newCommitter.save();
        console.log("new Commit Created");
        const setisFufilledTrue = setCommitIsFulfilled(pher_email, true);
        const setWantToInvestFalse = setWantToInvest(pher_email, false);
        const setisFufilledTruePromise = await setisFufilledTrue;
        const setWantToInvestFalsePromise = await setWantToInvestFalse;
        console.log(
          "Commit set isfulfilled:true, wantToInvest:false, ready for recommit"
        );
        //ADD TO DOWNLINE
        if (upline !== "new") {
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
          console.log("Added to Downline");
        }
      }
      // FIRST TIME COMMIT && AMOUNT EQUAL PLEDGE
      //
      if (exist === null && amount < pledge) {
        console.log("no old commit && commit less than pledge");
        // CREATE NEW COMMIT
        const newCommitter = new Committer({
          email: pher_email,
          amount: amount,
        });
        const savedCommit = await newCommitter.save();
        console.log("new Commit Created");
        console.log(
          "Commit is retained as isfulfilled:false & wantToInvest:true, not ready for recommit"
        );
        //ADD TO DOWNLINE
        if (upline !== "new") {
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
          console.log("Added to Downline");
        }
      }
      if (exist !== null) {
        console.log("old commit exists");
        const checkisFulfil = exist.isFufilled;

        if (checkisFulfil) {
          console.log("old commit is fulfilled");

          //CHECKS AND SETUP
          if (amount >= pledge) {
            console.log("current commit is fulfilled");
            // CREATE NEW/UPDATE GHER WITH OLD COMMIT AMOUNT
            // const handleGher = await createUpdateGher(pher_email, exist.amount);

            const existingGher = await Gher.findOne({ email: pher_email });
            const GherAmt = exist.amount * 1.5;
            if (existingGher === null) {
              console.log("No existing Gh");
              const moveOldCommitToGherCollection = await new Gher({
                email: pher_email,
                amount: GherAmt,
                isFirst: true,
              }).save();
              console.log("old commit used to create brand new Gher");
            }
            if (existingGher !== null) {
              console.log("old Gh exists");
              // check cashout history and decide if isFirst

              const user3 = await User.findOne(
                { email: pher_email },
                "cashoutHistory"
              );

              if (user3.cashoutHistory.length > 0) {
                console.log("there is cashout history");
                const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
                  { email: pher_email },
                  { $inc: { amount: GherAmt }, isFirst: false, isPaired: false }
                );
                console.log("old commit used to update Gher & isFirst:false");
              } else {
                console.log("there is no cashout history");
                const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
                  { email: pher_email },
                  { $inc: { amount: GherAmt }, isFirst: true, isPaired: false }
                );
                console.log(
                  "old commit used to update a running Gher and isFirst:true"
                );
              }
            }
            // RESET COMMIT
            const savedCommit = await Committer.findOneAndUpdate(
              { email: pher_email },
              { amount: amount, isFufilled: true }
            );
            console.log("commit reset");
            // const setisFufilledTrue = setCommitIsFulfilled(pher_email, true);
            const setWantToInvestFalse = setWantToInvest(pher_email, false);
            // const setisFufilledTruePromise = await setisFufilledTrue;
            const setWantToInvestFalsePromise = await setWantToInvestFalse;
            console.log("commit set isfulfilled:true, wantToInvest:false");
          }
          if (amount < pledge) {
            console.log("curent commit is not fulfilled");
            // CREATE NEW/UPDATE pENDING GHER WITH OLD COMMIT AMOUNT
            // const existingPendingGher = await PendingGher.findOne({
            //   email: pher_email,
            // });
            const pendingGherAmt = exist.amount * 1.5;
            // if (existingPendingGher === null) {
            const moveOldCommitToPendingGherCollection = await new PendingGher({
              email: pher_email,
              amount: pendingGherAmt,
            }).save();
            console.log("old commit used to create pending Gher");
            // }
            // if (existingPendingGher !== null) {
            //   const moveOldCommitToPendingGherCollection = await PendingGher.findOneAndUpdate(
            //     { email: pher_email },
            //     { $inc: { amount: pendingGherAmt } }
            //   );
            //   console.log("old commit used to update pending Gher");
            // }
            // RESET COMMIT
            const savedCommit = await Committer.findOneAndUpdate(
              { email: pher_email },
              { amount: amount, isFufilled: false }
            );
            console.log("commit reset");
            // const setisFufilledFalse = setCommitIsFulfilled(pher_email, false);
            const setwantToInvestTrue = setWantToInvest(pher_email, true);
            // const setisFufilledFalsePromise = await setisFufilledFalse;
            const setwantToInvestTruePromise = await setwantToInvestTrue;
            console.log("commit set isfulfilled:false, wantToInvest:true");
          }
        } else {
          console.log("old commit is not fulfilled");
          //INCREMENT TO COMMIT
          const incCommit = await Committer.findOneAndUpdate(
            { email: pher_email },
            { $inc: { amount: amount } },
            { new: true, runValidators: true, context: "query" }
          );
          console.log("total new incremented commit :", incCommit.amount);
          //CHECKS AND SETUP
          if (incCommit.amount >= pledge) {
            console.log("total increased commit is fulfilled");
            // CHECK FOR PENDING GHER AND CONFIRM IF ANY
            const existingPendingGher = await PendingGher.findOne({
              email: pher_email,
            });
            if (existingPendingGher !== null) {
              console.log("pending Gh exist");
              //  CONFIRM PENDING GHER TO MAIN GHER
              const existingGher2 = await Gher.findOne({ email: pher_email });
              if (existingGher2 === null) {
                console.log("no existing Gh");
                const moveOldCommitToGherCollection = await new Gher({
                  email: existingPendingGher.email,
                  amount: existingPendingGher.amount,
                  isFirst: true,
                }).save();
                console.log(
                  "pending Gher used to create fresh Gher with isFirst:true"
                );
              }
              if (existingGher2 !== null) {
                console.log("there is existing Gh");
                //  CHECK     CASHOUT HISTORY AND DECIDE IF ITS FIRST COMMIT
                const user3 = await User.findOne(
                  { email: pher_email },
                  "cashoutHistory"
                );

                if (user3.cashoutHistory.length > 0) {
                  console.log("user have cashout history ");
                  const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
                    { email: pher_email },
                    {
                      amount: existingPendingGher.amount,
                      isFirst: false,
                      isPaired: false,
                    }
                  );
                  console.log(
                    "pending Gher used to create new Gher from alreay paired gher, setting isFirst:false"
                  );
                } else {
                  console.log("user do not have cashout history ");
                  const moveOldCommitToGherCollection = await Gher.findOneAndUpdate(
                    { email: pher_email },
                    {
                      $inc: { amount: existingPendingGher.amount },
                      isFirst: true,
                      isPaired: false,
                    }
                  );
                  console.log(
                    "pending Gher used to update a running Gher & isFirst:true "
                  );
                }
              }
            }
            const setisFufilledTrue = setCommitIsFulfilled(pher_email, true);
            const setwantToInvestFalse = setWantToInvest(pher_email, false);
            const setIsFulfilledTruePromise = await setisFufilledTrue;
            const setwantToInvestFalsePromise = await setwantToInvestFalse;
            console.log("commit set isfulfilled:true, wantToInvest:false");
          } else {
            console.log("total increased commit is not fulfilled");
            // const setisFufilledFalse = setCommitIsFulfilled(pher_email, false);
            // const setwantToInvestTrue = setWantToInvest(pher_email, true);
            // const setIsFulfilledFalsePromise = await setisFufilledFalse;
            // const setwantToInvestTruePromise = await setwantToInvestTrue;
            console.log(
              "commit retained as  isfulfilled:false, wantToInvest:true"
            );
          }
        }
      }
      const deleteReceipt = await Receipt.findByIdAndDelete(receiptId);
      console.log("receipt Deleted");
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
      console.log("New User Activated");
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
      console.log("Guider's History Updated");
      // DELETE RECEIPT
      const deleteFeeReceipt = await Receipt.findByIdAndDelete(receiptId);
      console.log("Fee Receipt Deleted");

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
        console.log("not time for purge");
        return res.status(400).send("Kindly Wait Until deadline before Purge");
      }
      if (isActivationFee) {
        console.log("activation fee");
        const blockPher = await User.findOneAndUpdate(
          { email: pher_email },
          { isBlocked: true }
        );
        console.log("new user blocked");
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
        console.log("delete receipt and Guider Fee Purge successful");
        res.status(200).send("Payment Purged");
      } else {
        console.log("payment purge");
        // PAYMENT PURGE
        const blockPher = await User.findOneAndUpdate(
          { email: pher_email },
          { isBlocked: true }
        );
        console.log("blocked payment user");
        const reverseGherCollection = await Gher.findOneAndUpdate(
          { email: gher_email },
          { $inc: { amount: amount }, isPaired: false }
        );
        console.log("gher reversed");
        const deleteReceipt = await Receipt.findByIdAndDelete(receiptId);
        console.log("delete receipt and Payment Purge successful");
        res.status(200).send("Payment Purged");
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const foundReceipt = await Receipt.find();
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
      console.log("buffer updated");
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log("image deleted");
        }
      });
      res.status(200).send("POP Upload Successful!!");
    } catch (err) {
      console.log(err.message);
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
    console.log(err.message);
    res.json({ message: err.message });
  }
});

router.get("/automatch-otherCommits", verifyAdmin, async (req, res) => {
  // INPUTS
  const matchAuto = async () => {
    try {
      const gherSorted = await Gher.find({
        isPaired: false,
        isFirst: false,
        // updatedAt: {
        //   $lte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
        // },
      })
        .sort({
          updatedAt: -1,
        })
        .exec();
      const pherSorted = await Pher.find({ isPaired: false })
        .sort({
          updatedAt: -1,
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
      console.log(
        "selected gher",
        gherSorted[0].email,
        firstGherAmt,
        "...Selected pher",
        pherSorted[0].email,
        firstPherAmt
      );
      if (firstGherEmail === firstPherEmail) {
        console.log("Gh & Ph email is same user!!");
        if (pherSorted[1] === undefined || pherSorted[1] === null) {
          return res.status(200).send("No more Ph to pair");
        }
        var {
          amount: firstPherAmt,
          _id: firstPherID,
          email: firstPherEmail,
        } = pherSorted[1];
        console.log("new pher selected", firstPherEmail);
        const gh = await User.findOne({ email: firstGherEmail });
        const ph = await User.findOne({ email: firstPherEmail });
        if (firstGherAmt == firstPherAmt) {
          console.log("is equal");
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
          const updateIsPairedGher = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedPher = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updateIsPairedPher.amount}`
          );
          // res.status(200).send("success");
        }
        if (firstPherAmt < firstGherAmt) {
          console.log("pher is lesser");
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

          const updateGherBalance = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              $inc: { amount: -firstPherAmt },
              isPaired: false,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedPher = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateGherBalance.amount}, Pher:  ${updateIsPairedPher.amount}`
          );
          // res.status(200).send("success");
        }
        if (firstPherAmt > firstGherAmt) {
          console.log("pher is greater");
          // PHERAMT > GHERAMT
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
            amount: firstGherAmt,
            isActivationFee: false,
          };
          const makeReceipt = await new Receipt(obj).save();

          const updatePherBalance = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              $inc: { amount: -firstGherAmt },
              isPaired: false,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedGher = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updatePherBalance.amount}`
          );
          // res.status(200).send("success");
        }
        // RERUN;
        matchAuto();
      }
      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });
      if (firstGherAmt == firstPherAmt) {
        console.log("is equal");
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
        const updateIsPairedGher = await Gher.findByIdAndUpdate(
          firstGherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        const updateIsPairedPher = await Pher.findByIdAndUpdate(
          firstPherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        // SEND TEXT AND TELEGRAM
        // let phonee = "08036734191";
        // const textnumber = `+234${phonee.substr(1)}`;
        // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updateIsPairedPher.amount}`
        );
        // res.status(200).send("success");
      }
      if (firstPherAmt < firstGherAmt) {
        console.log("pher is lesser");
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

        const updateGherBalance = await Gher.findByIdAndUpdate(
          firstGherID,
          {
            $inc: { amount: -firstPherAmt },
            isPaired: false,
          },
          { new: true, runValidators: true, context: "query" }
        );
        const updateIsPairedPher = await Pher.findByIdAndUpdate(
          firstPherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        // SEND TEXT AND TELEGRAM
        // let phonee = "08036734191";
        // const textnumber = `+234${phonee.substr(1)}`;
        // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateGherBalance.amount}, Pher:  ${updateIsPairedPher.amount}`
        );
        // res.status(200).send("success");
      }
      if (firstPherAmt > firstGherAmt) {
        console.log("pher is greater");
        // PHERAMT > GHERAMT
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
          amount: firstGherAmt,
          isActivationFee: false,
        };
        const makeReceipt = await new Receipt(obj).save();

        const updatePherBalance = await Pher.findByIdAndUpdate(
          firstPherID,
          {
            $inc: { amount: -firstGherAmt },
            isPaired: false,
          },
          { new: true, runValidators: true, context: "query" }
        );
        const updateIsPairedGher = await Gher.findByIdAndUpdate(
          firstGherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        // SEND TEXT AND TELEGRAM
        // let phonee = "08036734191";
        // const textnumber = `+234${phonee.substr(1)}`;
        // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updatePherBalance.amount}`
        );
        // res.status(200).send("success");
      }
      // RERUN;
      matchAuto();
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ message: error.message });
    }
  };
  matchAuto();
  console.log("MatchAuto for other commits Started");
});
router.get("/automatch-firstcommit", verifyAdmin, async (req, res) => {
  // INPUTS
  const matchAuto = async () => {
    try {
      const gherSorted = await Gher.find({ isPaired: false, isFirst: true })
        .sort({
          updatedAt: -1,
        })
        .exec();
      const pherSorted = await Pher.find({ isPaired: false })
        .sort({
          updatedAt: -1,
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
      console.log(
        "selected gher",
        gherSorted[0].email,
        firstGherAmt,
        "...Selected pher",
        pherSorted[0].email,
        firstPherAmt
      );

      if (firstGherEmail === firstPherEmail) {
        console.log("Gh & Ph email is same user!!");
        if (pherSorted[1] === undefined || pherSorted[1] === null) {
          return res.status(200).send("No more Ph to pair");
        }

        var {
          amount: firstPherAmt,
          _id: firstPherID,
          email: firstPherEmail,
        } = pherSorted[1];

        console.log("new pher selected", firstPherEmail);
        const gh = await User.findOne({ email: firstGherEmail });
        const ph = await User.findOne({ email: firstPherEmail });
        if (firstGherAmt == firstPherAmt) {
          console.log("is equal");
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
          const updateIsPairedGher = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedPher = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updateIsPairedPher.amount}`
          );
          // res.status(200).send("success");
        }
        if (firstPherAmt < firstGherAmt) {
          console.log("pher is lesser");
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

          const updateGherBalance = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              $inc: { amount: -firstPherAmt },
              isPaired: false,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedPher = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateGherBalance.amount}, Pher:  ${updateIsPairedPher.amount}`
          );
          // res.status(200).send("success");
        }
        if (firstPherAmt > firstGherAmt) {
          console.log("pher is greater");
          // PHERAMT > GHERAMT
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
            amount: firstGherAmt,
            isActivationFee: false,
          };
          const makeReceipt = await new Receipt(obj).save();

          const updatePherBalance = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              $inc: { amount: -firstGherAmt },
              isPaired: false,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedGher = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updatePherBalance.amount}`
          );
          // res.status(200).send("success");
        }
        // RERUN;
        matchAuto();
      }
      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });
      if (firstGherAmt == firstPherAmt) {
        console.log("is equal");
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
        const updateIsPairedGher = await Gher.findByIdAndUpdate(
          firstGherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        const updateIsPairedPher = await Pher.findByIdAndUpdate(
          firstPherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        // SEND TEXT AND TELEGRAM
        // let phonee = "08036734191";
        // const textnumber = `+234${phonee.substr(1)}`;
        // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updateIsPairedPher.amount}`
        );
        // res.status(200).send("success");
      }
      if (firstPherAmt < firstGherAmt) {
        console.log("pher is lesser");
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

        const updateGherBalance = await Gher.findByIdAndUpdate(
          firstGherID,
          {
            $inc: { amount: -firstPherAmt },
            isPaired: false,
          },
          { new: true, runValidators: true, context: "query" }
        );
        const updateIsPairedPher = await Pher.findByIdAndUpdate(
          firstPherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        // SEND TEXT AND TELEGRAM
        // let phonee = "08036734191";
        // const textnumber = `+234${phonee.substr(1)}`;
        // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateGherBalance.amount}, Pher:  ${updateIsPairedPher.amount}`
        );
        // res.status(200).send("success");
      }
      if (firstPherAmt > firstGherAmt) {
        console.log("pher is greater");
        // PHERAMT > GHERAMT
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
          amount: firstGherAmt,
          isActivationFee: false,
        };
        const makeReceipt = await new Receipt(obj).save();

        const updatePherBalance = await Pher.findByIdAndUpdate(
          firstPherID,
          {
            $inc: { amount: -firstGherAmt },
            isPaired: false,
          },
          { new: true, runValidators: true, context: "query" }
        );
        const updateIsPairedGher = await Gher.findByIdAndUpdate(
          firstGherID,
          {
            isPaired: true,
            amount: 0,
          },
          { new: true, runValidators: true, context: "query" }
        );
        // SEND TEXT AND TELEGRAM
        // let phonee = "08036734191";
        // const textnumber = `+234${phonee.substr(1)}`;
        // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updatePherBalance.amount}`
        );
        // res.status(200).send("success");
      }
      // RERUN;
      matchAuto();
    } catch (error) {
      console.log(error.message);
      res.status(400).send(error.message);
    }
  };
  matchAuto();
  console.log("MatchAuto for first commits Started");
});
router.post(
  "/match-manual",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      gher_email: Joi.string().required(),
      pher_email: Joi.string().required(),
      amount: Joi.number().integer().required(),
    }),
  }),
  async (req, res) => {
    // INPUTS
    try {
      const {
        pher_email: firstPherEmail,
        gher_email: firstGherEmail,
        amount,
      } = req.body;
      const gherExist = await Gher.findOne({ email: firstGherEmail });

      if (gherExist === null) {
        console.log("gher does not exist");
        const createGher = await new Gher({
          email: firstGherEmail,
          amount: amount,
        }).save();
      }
      const gherExis = await Gher.findOne({ email: firstGherEmail });
      console.log("gotten gher", gherExis.email);
      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });

      const doc = new Receipt({
        gher_name: gh.name,
        gher_email: gh.email,
        gher_accountName: gh.accountName,
        gher_accountNo: gh.accountNo,
        gher_bank: gh.bank,
        gher_phone: gh.phone,
        pher_name: ph.name,
        pher_email: ph.email,
        pher_phone: ph.phone,
        amount: amount,
        isActivationFee: false,
      });
      const makeReceipt = await doc.save();

      const updateIsPairedGher = await Gher.findByIdAndUpdate(gherExis._id, {
        isPaired: true,
      });
      const updateIsPairedPher = await Pher.findOneAndUpdate(
        { email: firstPherEmail },
        {
          isPaired: true,
        }
      );
      // SEND TEXT AND TELEGRAM
      //  let phonee = "08036734191";
      //  const textnumber = `+234${phonee.substr(1)}`;
      //  const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
      const waitForTeegram = await postTelegram(
        makeReceipt.pher_name,
        makeReceipt.gher_name,
        makeReceipt.amount
      );
      console.log(
        `Receipt created for ${makeReceipt.pher_name}  to pay  ${makeReceipt.gher_name}   ${makeReceipt.amount}`
      );
      res.status(200).send("Success!");
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

router.patch(
  "/match-a-user-instant",
  verifyAdmin,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  async (req, res) => {
    // INPUTS
    const matchFaster = async () => {
      try {
        const { email } = req.body;
        const toGher = await Gher.findOne({ email: email });
        if (toGher.amount < 500)
          return res.status(200).send("User GH amount less than 500");
        const pherSorted = await Pher.find({ isPaired: false })
          .sort({
            updatedAt: -1,
          })
          .exec();
        const {
          amount: firstPherAmt,
          _id: firstPherID,
          email: firstPherEmail,
        } = pherSorted[0];
        const {
          amount: firstGherAmt,
          _id: firstGherID,
          email: firstGherEmail,
        } = toGher;

        const gh = await User.findOne({ email: firstGherEmail });
        const ph = await User.findOne({ email: firstPherEmail });
        if (firstGherAmt == firstPherAmt) {
          console.log("is equal");
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
          const updateIsPairedGher = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedPher = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updateIsPairedPher.amount}`
          );
          // res.status(200).send("success");
        }
        if (firstPherAmt < firstGherAmt) {
          console.log("pher is lesser");
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

          const updateGherBalance = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              $inc: { amount: -firstPherAmt },
              isPaired: false,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedPher = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateGherBalance.amount}, Pher:  ${updateIsPairedPher.amount}`
          );
          // res.status(200).send("success");
        }
        if (firstPherAmt > firstGherAmt) {
          console.log("pher is greater");
          // PHERAMT > GHERAMT
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
            amount: firstGherAmt,
            isActivationFee: false,
          };
          const makeReceipt = await new Receipt(obj).save();

          const updatePherBalance = await Pher.findByIdAndUpdate(
            firstPherID,
            {
              $inc: { amount: -firstGherAmt },
              isPaired: false,
            },
            { new: true, runValidators: true, context: "query" }
          );
          const updateIsPairedGher = await Gher.findByIdAndUpdate(
            firstGherID,
            {
              isPaired: true,
              amount: 0,
            },
            { new: true, runValidators: true, context: "query" }
          );
          // SEND TEXT AND TELEGRAM
          // let phonee = "08036734191";
          // const textnumber = `+234${phonee.substr(1)}`;
          // const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
          const waitForTeegram = await postTelegram(
            makeReceipt.pher_name,
            makeReceipt.gher_name,
            makeReceipt.amount
          );

          console.log(
            `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updatePherBalance.amount}`
          );
          // res.status(200).send("success");
        }
        matchFaster();
      } catch (err) {
        console.log(err.message);
        res.status(400).send(err.message);
      }
    };
    matchFaster();
  }
);

module.exports = router;
