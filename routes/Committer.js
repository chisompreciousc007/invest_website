const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Committer = require("../models/committer");
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
      const regCommitter = await User.findByIdAndUpdate(
        req.params.id,
        {
          wantToCashout: true,
        },
        { new: true, runValidators: true, context: "query" }
      );
      const newCommitter = new Committer({
        email: regCommitter.email,
        amount: +req.body.amount,
      });
      const savedCommitter = await newCommitter.save();
      res.json(savedCommitter);
      console.log("Committer saved");
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
  }
);

router.get("/", async (req, res) => {
  try {
    const foundCommitter = await Committer.find();
    res.json(foundCommitter);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
