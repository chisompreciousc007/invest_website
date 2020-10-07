const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt");
const Gher = require("../models/gher");
const Pher = require("../models/pher");
const Guider = require("../models/guider");
const User = require("../models/user");
const Committer = require("../models/committer");
require("dotenv/config");
const fs = require("fs");
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

router.get("/foruser/:email", async (req, res) => {
  try {
    // INPUTS
    const { email } = req.params;
    const receipt = await Receipt.find({
      $or: [{ gher_email: email }, { pher_email: email }],
    });

    res.json(receipt);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/updatePopPath", async (req, res) => {
  const { popPath, _id: receiptId } = req.body;
  // UPDATE RECEIPT WITH POP-PATH
  try {
    const result = await Receipt.findByIdAndUpdate(
      receiptId,
      {
        popPath: popPath,
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("Receipt POP updated");
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/confirmpayment/", async (req, res) => {
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
    const oneuser = await User.findOne({ email: pher_email }, "pledge");
    const pledge = oneuser.pledge;
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
    // FIRST TIME COMMIT
    if (!exist) {
      // CREATE NEW COMMIT
      const newCommitter = new Committer({
        email: pher_email,
        amount: amount,
        isFulfilled: false,
      });
      const savedCommit = await newCommitter.save();
      //CHECKS AND SETUP
      if ((savedCommit.amount = pledge)) {
        const setisFulfilledTrue = await Committer.findOneAndUpdate(
          { email: pher_email },
          { isFulfilled: true }
        );
        const setRecommitTrue = await User.findOneAndUpdate(
          { email: pher_email },
          { Recommit: true }
        );
      }
      if (savedCommit.amount < pledge) {
        const setisFulfilledTrue = await Committer.findOneAndUpdate(
          { email: pher_email },
          { isFulfilled: false }
        );
        const setRecommitTrue = await User.findOneAndUpdate(
          { email: pher_email },
          { Recommit: false }
        );
      }
      //ADD TO DOWNLINE
      const userF = await User.findOne({ email: pher_email }, "upline");
      const { upline } = userF;
      const updateDownline = await User.findOneAndUpdate(
        { username: upline },
        {
          $push: {
            downline: {
              name: pher_name,
              amount: amount * 0.05,
            },
          },
        }
      );
      console.log("New Commit Created");
      res.send("Successful");
    } else {
      const checkisFulfil = await exist.isFulfilled;
      if (checkisFulfil) {
        // CREATE NEW GHER WITH OLD COMMIT AMOUNT
        const GherAmt = exist.amount * 1.5;
        const moveOldCommitToGherCollection = await new Gher({
          email: pher_email,
          amount: GherAmt,
        }).save();
        // RESET COMMIT
        const savedCommit = await Committer.findOneAndUpdate(
          { email: pher_email },
          { amount: amount },
          { new: true, runValidators: true, context: "query" }
        );
        //CHECKS AND SETUP
        if ((savedCommit.amount = pledge)) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: true }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { Recommit: true }
          );
        }
        if (savedCommit.amount < pledge) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: false }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { Recommit: false }
          );
        }
      }
      if (!checkisFulfil) {
        //INCREMENT TO COMMIT
        const savedCommit = await Committer.findOneAndUpdate(
          { email: pher_email },
          { $inc: { amount: +amount } },
          { new: true, runValidators: true, context: "query" }
        );
        //CHECKS AND SETUP
        if ((savedCommit.amount = pledge)) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: true }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { Recommit: true }
          );
        }
        if (savedCommit.amount < pledge) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: false }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { Recommit: false }
          );
        }
      }
    }
    // DELETE POP IMAGE
    fs.unlink(`client/public/uploads/${popPath}`, (err) => {
      if (err) throw err;
      console.log("POP was deleted");
    });
    // DELETE RECEIPT
    const deleteReceipt = await Receipt.findByIdAndDelete(receiptId);
    console.log("Receipt Deleted");

    res.send("Receipt Confirm Process Completed");
  } catch (error) {
    res.json({ message: err });
  }
});
router.patch("/confirmfee/", async (req, res) => {
  try {
    // INPUTS
    const {
      gher_email,
      pher_email,
      amount,
      _id: receiptId,
      pher_name,
      popPath,
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

    //
    // DELETE POP IMAGE
    fs.unlink(`client/public/uploads/${popPath}`, (err) => {
      if (err) throw err;
      console.log("POP was deleted");
    });
    //
    console.log("Fee Confirm Process Completed");
  } catch (error) {
    res.json({ message: err });
  }
});
router.patch("/purge", async (req, res) => {
  try {
    const {
      _id: receiptID,
      gher_email,
      pher_email,
      pher_name,
      amount,
      isActivationFee,
      gherCollectionID,
    } = req.body;

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
      console.log("Guider Fee Purge successful");
    } else {
      // PAYMENT PURGE
      const blockPher2 = await User.findOneAndUpdate(
        { email: pher_email },
        { isBlocked: true }
      );
      const gherCurrentAmt = await Gher.findById(gherCollectionID);
      const currentAmt = gherCurrentAmt.amount;
      const newAmount = currentAmt + amount;
      const reverseGherCollection = await Gher.findByIdAndUpdate(
        gherCollectionID,
        { amount: newAmount }
      );
      const deleteReceipt = await Receipt.findByIdAndDelete(receiptId);
      console.log("Guider Fee Purge successful");
    }
    const newGher = new Gher({
      email: gher_email,
      amount: amount,
    }).save();
    console.log("Purged, Gher Resaved again to collection");
  } catch (error) {
    res.json({ message: err });
  }
});
router.get("/", async (req, res) => {
  try {
    const foundReceipt = await Receipt.find();
    res.json(foundReceipt);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/automatch", async (req, res) => {
  // INPUTS
  const matchAuto = async () => {
    try {
      const gherSorted = await Gher.find({ isPaired: false })
        .sort({
          updatedAt: -1,
        })
        .exec();
      const pherSorted = await Pher.find({ isPaired: false })
        .sort({
          updatedAt: -1,
        })
        .exec();

      if (!gherSorted.length || !pherSorted.length)
        return res.send("Empty Gher/Pher Collection");
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
        let phonee = "08036734191";
        const textnumber = `+234${phonee.substr(1)}`;
        const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updateIsPairedPher.amount}`
        );
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
        let phonee = "08036734191";
        const textnumber = `+234${phonee.substr(1)}`;
        const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateGherBalance.amount}, Pher:  ${updateIsPairedPher.amount}`
        );
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
          amount: firstPherAmt,
          isActivationFee: false,
        };
        const makeReceipt = await new Receipt(obj).save();

        const updatePherBalance = await Pher.findByIdAndUpdate(
          firstPherID,
          {
            $inc: { amount: -firstGherAmt },
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
        let phonee = "08036734191";
        const textnumber = `+234${phonee.substr(1)}`;
        const waitSMS = await sendSMS(makeReceipt.pher_name, textnumber);
        const waitForTeegram = await postTelegram(
          makeReceipt.pher_name,
          makeReceipt.gher_name,
          makeReceipt.amount
        );

        console.log(
          `Balance after Pairing...Gher: ${updateIsPairedGher.amount}, Pher:  ${updatePherBalance.amount}`
        );
      }
      // RERUN;
      matchAuto();
    } catch (error) {
      console.log("error from automatch start");
      res.send({ message: error });
    }
  };
  matchAuto();
  console.log("MatchAuto Started");
});

router.post(
  "/match-with-given-phemail-and-new-ghemail-and-amount",
  async (req, res) => {
    // INPUTS
    try {
      const {
        pher_email: firstPherEmail,
        gher_email: firstGherEmail,
        amount,
      } = req.body;
      const createGher = await new Gher({
        email: firstGherEmail,
        amount: amount,
      }).save();
      const gh = await User.findOne({ email: firstGherEmail });
      const ph = await User.findOne({ email: firstPherEmail });
      const makeReceipt = new Receipt({
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
      }).save();
      const updateIsPairedGher = await Gher.findByIdAndUpdate(firstGherID, {
        isPaired: true,
      });
      const updateIsPairedPher = await Pher.findByIdAndUpdate(firstPherID, {
        isPaired: true,
      });
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.post("/match-existing-gher-mail-now", async (req, res) => {
  // INPUTS
  try {
    const { email: firstGherEmai } = req.body;
    const gherSorted = await Gher.find({
      email: firstGherEmai,
      isPaired: false,
    });
    const pherSorted = await Pher.find({ isPaired: false }).sort("createdAt 1");
    let {
      amount: firstGherAmt,
      _id: firstGherID,
      email: firstGherEmail,
    } = gherSorted;
    let {
      amount: firstPherAmt,
      _id: firstPherID,
      email: firstPherEmail,
    } = pherSorted[0];
    while (firstGherAmt > 0) {
      if (pherSorted.length && gherSorted.length) {
        const gh = await User.findOne({ email: firstGherEmail });
        const ph = await User.findOne({ email: firstPherEmail });
        if ((firstGherAmt = firstPherAmt)) {
          const makeReceipt = new Receipt({
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
          }).save();
          const updateIsPairedGher = await Gher.findByIdAndUpdate(firstGherID, {
            isPaired: true,
          });
          const updateIsPairedPher = await Pher.findByIdAndUpdate(firstPherID, {
            isPaired: true,
          });
          let firstGherAmt = 0;
          console.log(
            `Receipt created for ${firstPherEmail}  to pay ${firstPherAmt}, ${firstGherEmail} to get ${firstGherAmt}`
          );
        }
        if (firstPherAmt < firstGherAmt) {
          const makeReceipt2 = new Receipt({
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
          }).save();
          const newAmt = firstGherAmt - firstPherAmt;
          const upddateGherBalance = await Gher.findByIdAndUpdate(firstGherID, {
            amount: newAmt,
          });
          const updateIsPairedPher = await Pher.findByIdAndUpdate(firstPherID, {
            isPaired: true,
          });
          let firstGherAmt = newAmt;
          console.log(
            `Receipt created for ${firstPherEmail}  to pay ${firstPherAmt}, ${firstGherEmail} to get ${firstGherAmt}`
          );
        } else {
          // PHERAMT > GHERAMT
          const makeReceipt3 = new Receipt({
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
          }).save();
          const newAmt = firstPherAmt - firstGherAmt;
          const upddatePherBalance = await Pher.findByIdAndUpdate(firstPherID, {
            amount: newAmt,
          });
          const updateIsPairedGher = await Gher.findByIdAndUpdate(firstGherID, {
            isPaired: true,
          });
          let firstGherAmt = 0;
          console.log(
            `Receipt created for ${firstPherEmail}  to pay ${firstPherAmt}, ${firstGherEmail} to get ${firstGherAmt}`
          );
        }
      }
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
