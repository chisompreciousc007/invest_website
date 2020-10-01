const express = require("express");
const router = express.Router();
const Gher = require("../models/gher");
const User = require("../models/user");

router.post("/:id", async (req, res) => {
  try {
    const regGher = await User.findByIdAndUpdate(
      req.params.id,
      {
        wantToCashout: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const newGher = new Gher({
      name: regGher.name,
      email: regGher.email,
      phone: regGher.phone,
      accountName: regGher.accountName,
      accountNo: regGher.accountNo,
      bank: regGher.bank,
    });
    const savedGher = await newGher.save();
    res.json(savedGher);
    console.log("Gher saved");
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reversedGher = await User.findByIdAndUpdate(
      req.params.id,
      {
        wantToCashout: false,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const deletedGher = await Gher.findByIdAndDelete(req.params.id);
    res.json("Gher is deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const foundGher = await Gher.find();
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
