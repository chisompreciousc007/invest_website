const express = require("express");
const router = express.Router();
const Pher = require("../models/pher");
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
      const regPher = await User.findByIdAndUpdate(
        req.params.id,
        {
          wantToInvest: true,
        },
        { new: true, runValidators: true, context: "query" }
      );
      const newPher = new Pher({
        username: regPher.username,
        email: regPher.email,
        amount: req.body.amount,
      });
      const savedPher = await newPher.save();
      res.json(savedPher);
      console.log("Pher saved");
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
  }
);

router.get("/", async (req, res) => {
  try {
    const foundPher = await Pher.find();
    res.json(foundPher);
  } catch (err) {
    res.json({ message: err });
  }
});
router.get("/admin", async (req, res) => {
  try {
    const foundPher = await Pher.find({ isPaired: false }, "email amount");
    res.json(foundPher);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
