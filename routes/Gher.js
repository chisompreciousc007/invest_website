const express = require("express");
const router = express.Router();
const OutstandingGher = require("../models/outstandingGher");
const OneDayGher = require("../models/1DGher");
const FourDayGher = require("../models/4DGher");
const SevenDayGher = require("../models/7DGher");
const PendingGher = require("../models/pendingGher");
const verifyAdmin = require("../verifyAdmin");

router.get("/1D", verifyAdmin, async (req, res) => {
  try {
    const foundGher = await OneDayGher.find({}, "email amount");
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/4D", verifyAdmin, async (req, res) => {
  try {
    const foundGher = await FourDayGher.find({}, "email amount");
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/7D", verifyAdmin, async (req, res) => {
  try {
    const foundGher = await SevenDayGher.find({}, "email amount");
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/outstanding", verifyAdmin, async (req, res) => {
  try {
    const foundGher = await OutstandingGher.find({}, "email amount");
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/pending", verifyAdmin, async (req, res) => {
  try {
    const foundPendingGher = await PendingGher.find({}, "email amount");
    res.json(foundPendingGher);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
