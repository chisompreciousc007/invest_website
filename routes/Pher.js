const express = require("express");
const router = express.Router();
const Pher = require("../models/pher");
const verifyAdmin = require("../verifyAdmin");

router.get("/", verifyAdmin, async (req, res) => {
  try {
    const foundPher = await Pher.find({}, "email amount");
    res.json(foundPher);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
