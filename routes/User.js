const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Guider = require("../models/guider");
const verify = require("../verifytoken");
const { loginValidation } = require("../validation");

const blockUser = async (id) => {
  await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        return err;
      } else {
        return result;
      }
    }
  );
};

router.get("/user", verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user });
    if (!user.isActivated || user.wantToInvest) {
      const dateNow = new Date();
      const blockTime = addHour(user.updatedAt, 12);
      console.log(dateNow, blockTime);
      if (dateNow > blockTime) res.json(blockUser(req.user));
    }
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  // validate data before sending
  // const { error } = newUserValidation(req.body);

  // if (error) return res.status(400).send(error.details[0].message);
  // check if user exist

  // const emailexist = await User.findOne({ email: req.body.email });
  // const phoneexist = await User.findOne({ phone: req.body.phone });
  // const usernameexist = await User.findOne({ username: req.body.username });

  // if (emailexist) return res.status(400).send("Email Already Exist");
  // if (phoneexist) return res.status(400).send("phone number Already Exist");
  // if (usernameexist) return res.status(400).send("username Already Exist");
  // hash password

  try {
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const foundGuiders = await Guider.find();
    const randomNumber = Math.floor(
      Math.random() * Math.floor(foundGuiders.length)
    );
    const selectedGuider = foundGuiders[randomNumber];
    console.log("selected guider");

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      upline: req.body.upline,
      accountName: req.body.accountName,
      accountNo: req.body.accountNo,
      bank: req.body.bank,
      guider: selectedGuider,
    });
    const savedUser = await newUser.save();
    console.log("new User saved");
    const editGuider = await User.findOneAndUpdate(
      { email: selectedGuider.email },
      {
        $push: {
          guiderMatchedForCashoutList: {
            name: savedUser.name,
            phone: savedUser.phone,
          },
        },
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("guider edited");
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  //validate data before sending
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // check if user is registered
  const user = await User.findOne({ username: req.body.username });

  if (!user) return res.status(400).send("username not found");

  // hash password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Incorrect password");
  //CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.SECRET);

  // res.setHeader("set-cookie", [`jwtToken=${token}`]);

  res.status(200).send(token);
});

router.post("/username", async (req, res) => {
  // check if username is taken
  console.log(req.body.username);
  const user = await User.findOne({ username: req.body.username });

  if (user) return res.send(true);
  if (!user) return res.send(false);
});
router.post("/phone", async (req, res) => {
  // check if username is taken
  const user = await User.findOne({ phone: req.body.phone });

  if (user) return res.send(true);
  return res.send(false);
});
router.post("/email", async (req, res) => {
  // check if email is taken
  const user = await User.findOne({ email: req.body.email });

  if (user) return res.send(true);
  if (!user) return res.send(false);
});

router.get("/", async (req, res) => {
  try {
    const foundUser = await User.find();
    res.json(foundUser);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json("user is deleted");
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/password/:id", async (req, res) => {
  // hash password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  await User.findByIdAndUpdate(
    req.params.id,
    {
      password: hashedPassword,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});
router.patch("/isActivated/:id", async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    {
      isActivated: req.body.isActivated,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.patch("/pop-guider/:id", async (req, res) => {
  console.log("pop saved name", req.body.popPath);
  await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: { "guider.popPath": req.body.popPath },
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

router.patch("/unblock/:id", async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    {
      isBlocked: false,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

//testing backend logic
router.patch("/wantToInvest/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        InvestAmt: req.body.InvestAmt,
      },
      { new: true, runValidators: true, context: "query" }
    );
    const result = await User.findByIdAndUpdate(
      req.params.id,
      {
        wantToInvest: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});
// testing block ends
router.patch("/wantToCashout/:id", async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    {
      wantToCashout: req.body.wantToCashout,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});
router.patch("/readyForCashout/:id", async (req, res) => {
  await User.findByIdAndUpdate(
    req.params.id,
    {
      readyForCashout: req.body.readyForCashout,
    },
    { new: true, runValidators: true, context: "query" },
    function (err, result) {
      if (err) {
        res.json(err);
      } else {
        res.json(result);
      }
    }
  );
});

module.exports = router;
