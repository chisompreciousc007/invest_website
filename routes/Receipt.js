const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt");
// const User = require("../models/user");
const Gher = require("../models/gher");
const Pher = require("../models/pher");
const Guider = require("../models/guider");
// const verify = require("../verifytoken");

const pairPhGh = async (ph, gh, amount) => {
  const newReceipt = new Receipt({
    gher: {
      email: gh.email,
      name: gh.name,
      accountName: gh.accountName,
      accountNumber: gh.accountNumber,
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
router.patch("/popPath/:id", async (req, res) => {
  await Receipt.findByIdAndUpdate(
    req.params.id,
    {
      popPath: req.body.popPath,
    },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
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
