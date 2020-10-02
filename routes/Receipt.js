const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt");
// const User = require("../models/user");
const Gher = require("../models/gher");
const Pher = require("../models/pher");
const Guider = require("../models/guider");
const User = require("../models/user");
const Committer = require("../models/committer");
// const verify = require("../verifytoken");

const pairPhGh = async (ph, gh, amount) => {
  const newReceipt = new Receipt({
    gher: {
      email: gh.email,
      name: gh.name,
      accountName: gh.accountName,
      accountNo: gh.accountNo,
      bank: gh.bank,
      phone: gh.phone,
    },
    pher: {
      name: ph.name,
      email: ph.email,
      phone: ph.phone,
    },
    amount: amount,
  });

  try {
    const savedReceipt = await newReceipt.save();
    res.json(savedReceipt);
    console.log("receipt saved");
  } catch (err) {
    res.json({ message: err });
  }
};

router.post("/", async (req, res) => {
  // INPUTS ARE phEmail & ghEmail && amount
  const { phEmail, ghEmail, amount } = req.body;
  const foundPher = await Pher.findOne({ phEmail });
  const foundGher = await Gher.findOne({ ghEmail });
  return console.log(phEmail, ghEmail, amount);
  //   pairPhGh(foundPher, foundGher, amount);
});
router.get("/foruser/:email", async (req, res) => {
  try {
    console.log(req.params.email);
    const receipt = await Receipt.find({
      $or: [{ gher_email: req.params.email }, { pher_email: req.params.email }],
    });

    res.json(receipt);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/updatePopPath/:id", async (req, res) => {
  await Receipt.findByIdAndUpdate(
    req.params.id,
    {
      popPath: req.body.popPath,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        console.log("Receipt POP updated");
        res.json(result);
      }
    }
  );
});

router.patch("/confirm/:id", async (req, res) => {
  try {
    const confirmReceipt = await Receipt.findByIdAndUpdate(req.params.id, {
      isConfirmed: true,
    });
    console.log("Receipt status changed to Confirmed");
    const addToPherHistory = await User.findOneAndUpdate(
      { email: req.body.pher_email },
      {
        $push: {
          investHistory: {
            accountName: req.body.gher_accountName,
            accountNo: req.body.gher_accountNo,
            bank: req.body.gher_bank,
            phone: req.body.gher_phone,
            amount: req.body.amount,
            popPath: req.body.popPath,
          },
        },
      }
    );
    console.log("Pher's investHistory Updated");
    const addToGherHistory = await User.findOneAndUpdate(
      { email: req.body.gher_email },
      {
        $push: {
          cashoutHistory: {
            name: req.body.pher_email,
            phone: req.body.pher_phone,
            amount: req.body.amount,
          },
        },
      }
    );
    console.log("Gher's cashoutHistory Updated");

    const deleteReceipt = await Receipt.findByIdAndDelete(req.params.id);
    console.log("Receipt Deleted");

    const committerExist = await find({ email: req.body.pher_email });
    if (committerExist.length) {
      const tempArray = committerExist.map((el) => el.amount);
      const sumOfCommit = tempArray.reduce((a, b) => a + b, 0);
      const tempUser = await User.findOne({ email: req.body.pher_email });
      const lastPledgeIndex = tempUser.investAmountHistory.length - 1;
      const lastPledge = +tempUser.investAmountHistory[lastPledgeIndex];
      if (sumOfCommit == lastPledge) {
        const newGher = new Gher({
          username: committerExist[0].username,
          email: committerExist[0].email,
          amount: sumOfCommit,
        });
        const savedGher = await newGher.save();
        console.log("Pushed Old Commit to Ghers Array");
      }
      // CONTINUE HERE
      if (sumOfCommit <= lastPledge) {
        const newGher = new Gher({
          username: committerExist[0].username,
          email: committerExist[0].email,
          amount: sumOfCommit,
        });
        const savedGher = await newGher.save();
        console.log("Pushed Old Commit to Ghers Array");
      }
    }
    if (!committerExist.length) {
      const newCommitter = new Committer({
        username: committerExist.username,
        email: committerExist.email,
        amount: committerExist.amount * 1.5,
      });
      const savedCommitter = await newCommitter.save();
      console.log("saved Payer to Committers Array");
    }

    const gherJSON = await User.findOne({ email: req.body.gher_email });
    res.json(gherJSON);
    console.log("Receipt Confirm Process Completed");
  } catch (error) {
    res.json({ message: err });
  }
});
router.patch("/confirmfee/:id", async (req, res) => {
  try {
    const confirmedReceipt = await Receipt.findByIdAndUpdate(req.params.id, {
      isConfirmed: true,
    });
    console.log("Fee status changed to Confirmed");
    const addToGuiderHistory = await User.findOneAndUpdate(
      { email: req.body.gher_email },
      {
        $push: {
          guiderHistory: {
            name: req.body.pher_email,
            phone: req.body.pher_phone,
            amount: req.body.amount,
          },
        },
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("Guider's History Updated");
    const deleteFeeReceipt = await Receipt.findByIdAndDelete(req.params.id);
    console.log("Fee Receipt Deleted");
    const activateNewUser = await User.findOneAndUpdate(
      { email: req.body.pher_email },
      {
        isActivated: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("New User Activated");
    const guiderJSON = await User.findOne({ email: req.body.gher_email });
    res.json(guiderJSON);
    console.log("Fee Confirm Process Completed");
  } catch (error) {
    res.json({ message: err });
  }
});
router.patch("/purge/:id", async (req, res) => {
  try {
    const Receipt = await Receipt.findById(req.params.id);
    const gherObj = {
      username: Receipt.gher_name,
      email: Receipt.gher_email,
      amount: Receipt.amount,
    };
    const newGher = new Gher(gherObj);
    const savedGher = await newGher.save();
    console.log("Purged and gher Resaved again");
    const deleteReceipt = await Receipt.findByIdAndDelete(req.params.id);
  } catch (error) {
    res.json({ message: err });
  }
});

router.get("/date", async (req, res) => {
  try {
    const foundReceipt = await Receipt.find();

    const day = new Date().getDay();
    res.json(day);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const receipt = await Receipt.findById(req.params.id);
    res.json(receipt);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/provider/:id", async (req, res) => {
  try {
    const receipt = await Receipt.find({
      provider_id: req.params.id,
      isConfirmed: false,
      isPurged: false,
    });
    res.json(receipt);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/getter/:id", async (req, res) => {
  try {
    const receipt = await Receipt.find({
      getter_id: req.params.id,
      isConfirmed: false,
      isPurged: false,
    });
    res.json(receipt);
  } catch (err) {
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

router.delete("/:id", async (req, res) => {
  try {
    await Receipt.findByIdAndDelete(req.params.id);
    res.json("Receipt is deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/isConfirmed/:id", async (req, res) => {
  const getterObj = {
    accountName: req.body.getter_accountName,
    accountNumber: req.body.getter_accountNumber,
    bank: req.body.getter_bank,
    phone: req.body.getter_phone,
    amount: req.body.amount,
    popPath: req.body.popPath,
  };
  const providerObj = {
    name: req.body.provider_name,
    phone: req.body.provider_phone,
    amount: req.body.amount,
    popPath: req.body.popPath,
  };
  try {
    const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, {
      isConfirmed: true,
    });
    const updatedCashoutHistory = await User.findByIdAndUpdate(
      req.body.getter_id,
      { $push: { cashoutHistory: providerObj } }
    );
    const updatedInvestList = await User.findByIdAndUpdate(
      req.body.provider_id,
      { $push: { InvestHistory: getterObj } }
    );
    const investor = await User.findById(req.body.provider_id);
    const oldpendingInvestAmt = investor.pendingInvestAmt;
    const newpendingInvestAmt = oldpendingInvestAmt - req.body.amount;
    const updatedpendingInvestAmt = await User.findByIdAndUpdate(
      req.body.provider_id,
      { pendingInvestAmt: newpendingInvestAmt }
    );
    const reciever = await User.findById(req.body.getter_id);
    const oldpendingCashoutAmt = reciever.pendingCashoutAmt;
    const newpendingCashoutAmt = oldpendingCashoutAmt - req.body.amount;
    const updatedpendingCashoutAmt = await User.findByIdAndUpdate(
      req.body.provider_id,
      { pendingCashoutAmt: newpendingCashoutAmt }
    );
    const checkinvestor = await User.findById(req.body.provider_id);
    if ((checkinvestor.pendingInvestAmt = 0)) {
      const makePayerCashoutCleared = await User.findByIdAndUpdate(
        req.body.provider_id,
        { readyForCashout: true }
      );
    }

    res.json(updatedCashoutList);
  } catch (error) {
    res.json(error);
  }
});

router.patch("/isPurged/:id", async (req, res) => {
  try {
    const updatePurge = await Receipt.findByIdAndUpdate(req.params.id, {
      isPurged: true,
    });
    const blockPayer = await User.findByIdAndUpdate(req.body.provider_id, {
      isBlocked: true,
    });

    const reciever = await User.findById(req.body.getter_id);
    const oldpurgeAmt = reciever.purgeAmt;
    const newpurgeAmt = oldpurgeAmt + req.body.amount;
    const updatepurgeAmt = await User.findByIdAndUpdate(req.body.provider_id, {
      purgeAmt: newpurgeAmt,
    });
    res.json(updatepurgeAmt);
  } catch (error) {
    res.json(error);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Receipt.findByIdAndDelete(req.params.id);
    res.json("Receipt is deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
