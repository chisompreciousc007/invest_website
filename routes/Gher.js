const express = require("express");
const router = express.Router();
const Gher = require("../models/gher");
const OutstandingGher = require("../models/outstandingGher");
const OneDayGher = require("../models/1DGher");
const FourDayGher = require("../models/4DGher");
const SevenDayGher = require("../models/7DGher");
const PendingGher = require("../models/pendingGher");
const User = require("../models/user");
const { celebrate, Joi, Segments } = require("celebrate");
const verifyAdmin = require("../verifyAdmin");

router.post(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
      amount: Joi.number().integer().required(),
    }),
  }),
  async (req, res) => {
    try {
      const regGher = await User.findByIdAndUpdate(
        req.params.id,
        {
          wantToCashout: true,
        },
        { new: true, runValidators: true, context: "query" }
      );
      const newGher = new Gher({
        username: regGher.username,
        email: regGher.email,
        amount: req.body.amount,
      });
      const savedGher = await newGher.save();
      res.json(savedGher);
      console.log("Gher saved");
    } catch (err) {
      res.json({ message: err });
    }
  }
);

router.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  async (req, res) => {
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
  }
);

router.get("/all-details", async (req, res) => {
  try {
    const foundGher = await Gher.find();
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/", async (req, res) => {
  try {
    const foundGher = await Gher.find({}, "email amount");
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
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
router.get("/:email", async (req, res) => {
  try {
    const oneDayGher = await OneDayGher.findOne(
      { email: req.params.email },
      "amount"
    );
    const fourDayGher = await FourDayGher.findOne(
      { email: req.params.email },
      "amount"
    );
    const sevenDayGher = await SevenDayGher.findOne(
      { email: req.params.email },
      "amount"
    );
    const verify = (v) => {
      if (v === null) return 0;
      return v.amount;
    };
    const totalAmt =
      verify(oneDayGher) + verify(fourDayGher) + verify(sevenDayGher);
    if (totalAmt == 0) return res.status(200).send({ ghStatus: {} });
    res
      .status(200)
      .json({ ghStatus: { email: req.params.email, amount: totalAmt } });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
