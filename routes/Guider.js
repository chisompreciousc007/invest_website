const express = require("express");
const router = express.Router();
const Guider = require("../models/guider");
const User = require("../models/user");

router.post("/:email", async (req, res) => {
  try {
    const regGuider = await User.findOne({ email: req.params.email });
    const newGuider = new Guider({
      email: regGuider.email,
    });
    const savedGuider = await newGuider.save();
    res.json(savedGuider);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:email", async (req, res) => {
  try {
    const reversedGuider = await User.findOneAndDelete({
      email: req.params.email,
    }).exec();
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const foundGuider = await Guider.find({}).exec();
    res.json(foundGuider);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
