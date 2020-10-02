const express = require("express");
const router = express.Router();
const Gher = require("../models/gher");
const User = require("../models/user");
const Committer = require("../models/committer");

router.post("/:id", async (req, res) => {
  try {
    const regCommitter = await User.findByIdAndUpdate(
      req.params.id,
      {
        wantToCashout: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const newCommitter = new Committer({
      username: regCommitter.username,
      email: regCommitter.email,
      amount: +req.body.amount * 1.5,
    });
    const savedCommitter = await newCommitter.save();
    res.json(savedCommitter);
    console.log("Committer saved");
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // const reversedGher = await User.findByIdAndUpdate(
    //   req.params.id,
    //   {
    //     wantToCashout: false,
    //   },
    //   { new: true, runValidators: true, context: "query" }
    // );
    const deletedCommitter = await Committer.findByIdAndDelete(req.params.id);
    res.json("Committer is deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const foundCommitter = await Committer.find();
    res.json(foundCommitter);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
