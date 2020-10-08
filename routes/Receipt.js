const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt");
const Gher = require("../models/gher");
const Pher = require("../models/pher");
const Guider = require("../models/guider");
const User = require("../models/user");
const Committer = require("../models/committer");
const { compareAsc, addHours } = require("date-fns");
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
    };
    res.json(resultObj);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/updatePopPath/:id", async (req, res) => {
  const { popPath } = req.body;
  // UPDATE RECEIPT WITH POP-PATH
  try {
    const result = await Receipt.findByIdAndUpdate(
      req.params.id,
      {
        popPath: popPath,
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log(result);
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
    console.log("pledge", pledge);
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
      console.log("new Commit Created");
      //CHECKS AND SETUP
      if (savedCommit.amount == pledge) {
        const setisFulfilledTrue = await Committer.findOneAndUpdate(
          { email: pher_email },
          { isFulfilled: true }
        );
        const setRecommitTrue = await User.findOneAndUpdate(
          { email: pher_email },
          { Recommit: true, wantToInvest: true }
        );
        console.log("ready for recommit");
      }
      if (savedCommit.amount < pledge) {
        const setisFulfilledTrue = await Committer.findOneAndUpdate(
          { email: pher_email },
          { isFulfilled: false }
        );
        const setRecommitTrue = await User.findOneAndUpdate(
          { email: pher_email },
          { Recommit: false, wantToInvest: false }
        );
        console.log("not ready for recommit");
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
      console.log("Added to Downline");
      res.send("Successful");
    } else {
      console.log("old commit exists");
      const checkisFulfil = await exist.isFulfilled;
      if (checkisFulfil) {
        console.log("old commit is fulfilled");
        // CREATE NEW GHER WITH OLD COMMIT AMOUNT
        const GherAmt = exist.amount * 1.5;
        const moveOldCommitToGherCollection = await new Gher({
          email: pher_email,
          amount: GherAmt,
        }).save();
        console.log("old commit sent to Gher Collection");
        // RESET COMMIT
        const savedCommit = await Committer.findOneAndUpdate(
          { email: pher_email },
          { amount: amount },
          { new: true, runValidators: true, context: "query" }
        );
        console.log("commit reset");
        //CHECKS AND SETUP
        if (savedCommit.amount == pledge) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: true }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { wantToInvest: true }
          );
          console.log("new commit set isfulfilled");
        }
        if (savedCommit.amount < pledge) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: false }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { wantToInvest: false }
          );
          console.log("new commit is not fulfilled");
        }
      }
      if (!checkisFulfil) {
        //INCREMENT TO COMMIT
        console.log("add to existing commit");
        const savedCommit = await Committer.findOneAndUpdate(
          { email: pher_email },
          { $inc: { amount: +amount } },
          { new: true, runValidators: true, context: "query" }
        );
        console.log("total new inc. ommit", savedCommit.amount);
        //CHECKS AND SETUP
        if (savedCommit.amount == pledge) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: true }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { Recommit: true, wantToInvest: true }
          );
          console.log("new total commit set isfulfilled");
        }
        if (savedCommit.amount < pledge) {
          const setisFulfilledTrue = await Committer.findOneAndUpdate(
            { email: pher_email },
            { isFulfilled: false }
          );
          const setRecommitTrue = await User.findOneAndUpdate(
            { email: pher_email },
            { Recommit: false, wantToInvest: false }
          );
          console.log("new total commit is not fulfilled");
        }
      }
    }
    // DELETE POP IMAGE
    if (popPath) {
      fs.unlink(`client/public/uploads/${popPath}`, (err) => {
        if (err) throw err;
        console.log("POP was deleted");
      });
    }
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
    if (!gher_email || !pher_email || !amount || !receiptId || !pher_name)
      throw new Error("Request Body Incomplete");
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
    if (!popPath) {
      fs.unlink(`client/public/uploads/${popPath}`, (err) => {
        if (err) throw err;
        console.log("POP was deleted");
      });
    }
    //
    console.log("Fee Confirm Process Completed");
    res.json({ message: "Success" });
  } catch (error) {
    res.json({ message: error.message });
  }
});
router.patch("/purge", async (req, res) => {
  try {
    console.log("purge started");
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
    console.log(timecompare, new Date(), expDate);
    // if (timecompare != 1)
    //   throw new Error("Kindly Wait Until deadline before Purge");
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
      res.json({ message: "Success" });
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
      res.json({ message: "Success" });
    }
  } catch (err) {
    res.json({ message: err.message });
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

router.post("/match-manual", async (req, res) => {
  // INPUTS
  try {
    const {
      pher_email: firstPherEmail,
      gher_email: firstGherEmail,
      amount,
    } = req.body;
    const gherExist = await Gher.findOne({ email: firstGherEmail });

    if (!gherExist) {
      const createGher = await new Gher({
        email: firstGherEmail,
        amount: amount,
      }).save();
    }
    const gherExis = await Gher.findOne({ email: firstGherEmail });
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
    const updateIsPairedGher = await Gher.findByIdAndUpdate(gherExis._id, {
      isPaired: true,
    });
    const updateIsPairedPher = await Pher.findByIdAndUpdate(firstPherID, {
      isPaired: true,
    });
    console.log(
      `Receipt created for ${firstPherEmail}  to pay  ${firstGherEmail}   ${amount}`
    );
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/match-faster", async (req, res) => {
  // INPUTS
  try {
    const { email: firstGherEmail, amount } = req.body;
    const addamounttoGher = await Gher.findOneAndUpdate(
      { email: firstGherEmail },
      { $inc: { amount: amount }, isPaired: false }
    );
    const pherSorted = await Pher.find({ isPaired: false }).sort("createdAt 1");
    let {
      amount: firstPherAmt,
      _id: firstPherID,
      email: firstPherEmail,
    } = pherSorted[0];

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

      const gherExis = await Gher.findOne({ email: firstGherEmail });
      const updateIsPairedGher = await Gher.findByIdAndUpdate(gherExis._id, {
        isPaired: true,
      });
      const updateIsPairedPher = await Pher.findByIdAndUpdate(firstPherID, {
        isPaired: true,
      });
      console.log(
        `Receipt created for ${firstPherEmail}  to pay  ${firstGherEmail}   ${amount}`
      );
    }
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
