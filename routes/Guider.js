const express = require("express");
const router = express.Router();
const Guider = require("../models/guider");
const User = require("../models/user");

router.post("/:id", async (req, res) => {
  try {
    const regGuider = await User.findByIdAndUpdate(
      req.params.id,
      {
        isGuider: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const newGuider = new Guider({
      username: regGuider.username,
      email: regGuider.email,
    });
    const savedGuider = await newGuider.save();
    res.json(savedGuider);
    console.log("Guider saved");
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const reversedGuider = await User.findByIdAndUpdate(
      req.params.id,
      {
        isGuider: false,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const deletedGuider = await Guider.findByIdAndDelete(req.params.id);
    res.json("user is deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const foundGuider = await Guider.find();
    res.json(foundGuider);
  } catch (err) {
    res.json({ message: err });
  }
});
module.exports = router;
