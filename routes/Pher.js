const express = require("express");
const router = express.Router();
const Pher = require("../models/pher");
const User = require("../models/user");

router.post("/:id", async (req, res) => {
  try {
    const regPher = await User.findByIdAndUpdate(
      req.params.id,
      {
        wantToInvest: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const newPher = new Pher({
      name: regPher.name,
      email: regPher.email,
      phone: regPher.phone,
      accountName: regPher.accountName,
      accountNo: regPher.accountNo,
      bank: regPher.bank,
    });
    const savedPher = await newPher.save();
    res.json(savedPher);
    console.log("Pher saved");
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reversedPher = await User.findByIdAndUpdate(
      req.params.id,
      {
        wantToCashout: false,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const deletedPher = await Pher.findByIdAndDelete(req.params.id);
    res.json("user is deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const foundPher = await Pher.find();
    res.json(foundPher);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
