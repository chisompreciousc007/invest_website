const express = require("express");
const router = express.Router();
const Receipt = require("../models/receipt");
const user = require("../models/user");
// const verify = require("../verifytoken");
router.get("/date", async (req, res) => {
    try {
        const foundReceipt = await Receipt.find();

        const day = new Date().getDay()
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
        const receipt = await Receipt.find({ provider_id: req.params.id, isConfirmed: false, isPurged: false });
        res.json(receipt);
    } catch (err) {
        res.json({ message: err });
    }
});
router.get("/getter/:id", async (req, res) => {
    try {
        const receipt = await Receipt.find({ getter_id: req.params.id, isConfirmed: false, isPurged: false });
        res.json(receipt);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post("/", async (req, res) => {

    const newReceipt = new Receipt({
        getter_id: req.body.getter_id,
        getter_name: req.body.getter_name,
        getter_accountName: req.body.getter_accountName,
        getter_accountNumber: req.body.getter_accountNumber,
        getter_bank: req.body.getter_bank,
        getter_phone: req.body.getter_phone,
        provider_name: req.body.provider_name,
        provider_id: req.body.provider_id,
        provider_phone: req.body.provider_phone,
        amount: req.body.amount,


    });

    try {
        const savedReceipt = await newReceipt.save();
        res.json(savedReceipt);
        console.log("User saved");
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

        const updatedReceipt = await Receipt.findByIdAndUpdate(
            req.params.id,
            {
                isConfirmed: true,
            }
        );
        const updatedCashoutHistory = await User.findByIdAndUpdate(
            req.body.getter_id, { $push: { cashoutHistory: providerObj } }
        );
        const updatedInvestList = await User.findByIdAndUpdate(
            req.body.provider_id, { $push: { InvestHistory: getterObj } }
        );
        const investor = await User.findById(
            req.body.provider_id
        );
        const oldpendingInvestAmt = investor.pendingInvestAmt;
        const newpendingInvestAmt = oldpendingInvestAmt - req.body.amount;
        const updatedpendingInvestAmt = await User.findByIdAndUpdate(
            req.body.provider_id, { pendingInvestAmt: newpendingInvestAmt }
        );
        const reciever = await User.findById(
            req.body.getter_id
        );
        const oldpendingCashoutAmt = reciever.pendingCashoutAmt;
        const newpendingCashoutAmt = oldpendingCashoutAmt - req.body.amount;
        const updatedpendingCashoutAmt = await User.findByIdAndUpdate(
            req.body.provider_id, { pendingCashoutAmt: newpendingCashoutAmt }
        );
        const checkinvestor = await User.findById(
            req.body.provider_id
        );
        if (checkinvestor.pendingInvestAmt = 0) {
            const makePayerCashoutCleared = await User.findByIdAndUpdate(
                req.body.provider_id, { readyForCashout: true }
            );
        }

        res.json(updatedCashoutList)

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
        const updatePurge = await Receipt.findByIdAndUpdate(
            req.params.id,
            {
                isPurged: true
            },

        );
        const blockPayer = await User.findByIdAndUpdate(
            req.body.provider_id,
            {
                isBlocked: true
            },

        );

        const reciever = await User.findById(
            req.body.getter_id
        );
        const oldpurgeAmt = reciever.purgeAmt;
        const newpurgeAmt = oldpurgeAmt + req.body.amount;
        const updatepurgeAmt = await User.findByIdAndUpdate(
            req.body.provider_id, { purgeAmt: newpurgeAmt }
        );
        res.json(updatepurgeAmt)

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
