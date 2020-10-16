const express = require("express");
const router = express.Router();
const Gher = require("../models/gher");
const PendingGher = require("../models/pendingGher");
const User = require("../models/user");
const { celebrate, Joi, Segments } = require("celebrate");

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

router.get("/", async (req, res) => {
  try {
    const foundGher = await Gher.find();
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/admin", async (req, res) => {
  try {
    const foundGher = await Gher.find({ isPaired: false }, "email amount");
    res.json(foundGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/pending", async (req, res) => {
  try {
    const foundPendingGher = await PendingGher.find({}, "email amount");
    res.json(foundPendingGher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/:email", async (req, res) => {
  try {
    const foundGher = await Gher.findOne({ email: req.params.email }, "amount");
    if (foundGher == null) return res.status(200).send({ ghStatus: {} });
    if (foundGher.amount == 0) return res.status(200).send({ ghStatus: {} });
    res.status(200).json({ ghStatus: foundGher });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
