const express = require("express");
const router = express.Router();
const Guider = require("../models/guider");
const User = require("../models/user");
const { celebrate, Joi, Segments } = require("celebrate");
const verifyAdmin = require("../verifyAdmin");
const isEmpty = (val) => val == null || !(Object.keys(val) || val).length;
// CREATE USER
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  verifyAdmin,
  async (req, res) => {
    try {
      const foundUser = await User.findOne({ email: req.body.email });
      if (isEmpty(foundUser)) {
        return res.status(400).send("Email not Found!");
      }
      const savedGuider = await new Guider({
        email: req.body.email,
      }).save();
      res.status(200).json(savedGuider);
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
);

// DELETE GUIDER
router.delete(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
  }),
  verifyAdmin,
  async (req, res) => {
    try {
      const foundGuider = await Guider.findOne({ email: req.body.email });
      if (isEmpty(foundGuider)) {
        return res.status(400).send("Guider not Found!");
      }
      const reversedGuider = await Guider.findOneAndDelete({
        email: req.body.email,
      }).exec();
      res.status(200).send("Guider Deleted");
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
);

// GET ALL GUIDER(WITH ADMIN VERIFICATION)
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const foundGuider = await Guider.find({}).exec();
    res.status(200).json(foundGuider);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});
module.exports = router;
