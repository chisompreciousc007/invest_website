const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const Guider = require("../models/guider");
const verify = require("../verifytoken");
const { loginValidation } = require("../validation");
const { findOne } = require("../models/user");
const Receipt = require("../models/receipt");
const Committer = require("../models/committer");

const pairPhGhWithEmail = async (a, b, amount) => {
  const ph = await User.findOne({ email: a });
  const gh = await User.findOne({ email: b });
  const newReceipt = new Receipt({
    gher_name: gh.name,
    gher_email: gh.email,
    gher_accountName: gh.accountName,
    gher_accountNo: gh.accountNo,
    gher_bank: gh.bank,
    gher_phone: gh.phone,
    pher_name: ph.name,
    pher_email: ph.email,
    pher_phone: ph.phone,
    amount: amount,
    isActivationFee: true,
  });
  const savedReceipt = await newReceipt.save();
  console.log(
    `Receipt generated btw ${pher_email} and ${gher_email} for ${amount} `
  );
};

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
    const user = await User.findOne({ _id: req.user._id });
    // if (!user.isActivated || user.wantToInvest) {
    //   const dateNow = new Date();
    //   const blockTime = addHour(user.updatedAt, 12);
    //   console.log(dateNow, blockTime);
    //   if (dateNow > blockTime) res.json(blockUser(req.user));
    // }
    res.json(user);
  } catch (err) {
    res.json({ message: err });
  }
});
// CREATE USER
router.post("/", async (req, res) => {
  try {
    // HASH PASSWORD
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // SELECT A RANDOM GUIDER
    const foundGuiders = await Guider.find({});
    const randomNumber = Math.floor(
      Math.random() * Math.floor(foundGuiders.length)
    );
    const selectGuider = foundGuiders[randomNumber];
    console.log(
      `selected random guider ${selectGuider.email} out of ${foundGuiders.length} `
    );
    // SAVE USER

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
    });
    const savedUser = await newUser.save();
    console.log("new User saved");
    // CREATE RECEIPT FOR ACTIVATION FEE
    const gh = await User.findOne({ email: selectGuider.email });
    const newReceipt = new Receipt({
      gher_name: gh.name,
      gher_email: gh.email,
      gher_accountName: gh.accountName,
      gher_accountNo: gh.accountNo,
      gher_bank: gh.bank,
      gher_phone: gh.phone,
      pher_name: savedUser.name,
      pher_email: savedUser.email,
      pher_phone: savedUser.phone,
      amount: 1000,
      isActivationFee: true,
    });
    const savedReceipt = await newReceipt.save();
    console.log("Fee Receipt Generated");
    // UPDATE GUIDER History
    const editGuider = await User.findOneAndUpdate(
      { email: selectGuider.email },
      {
        $push: {
          // change to guiderHistory afterv test
          guiderList: {
            name: savedUser.name,
            phone: savedUser.phone,
            amount: 1000,
          },
        },
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("guiderHistory edited");
    // UPDATE REFERRALS
    const checkReferee = await User.findOne({ username: req.body.upline });
    if (req.body.upline !== "new" && checkReferee !== null) {
      const editReferee = await User.findOneAndUpdate(
        { username: req.body.upline },
        {
          $push: {
            downline: {
              name: savedUser.name,
            },
          },
        },
        { new: true, runValidators: true, context: "query" }
      );
      console.log("Referal Updated");
    }

    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});
// TESTING OUT ROUTES
// router.post("/test", async (req, res) => {
//   const checkReferee = await User.findOne({ username: "jbond" }, "name");
//   res.send(checkReferee);
// });
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
// POP UPLOAD FOR ACTIVATION FEE
router.patch("/pop/:id", async (req, res) => {
  console.log("pop saved name", req.body.popPath);
  await Receipt.findByIdAndUpdate(
    req.params.id,

    { pop: req.body.popPath },
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
router.get("/", async (req, res) => {
  try {
    const foundUser = await User.find();
    res.json(foundUser);
  } catch (err) {
    res.json({ message: err });
  }
});
router.patch("/wantToInvest/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          investAmountHistory: req.body.investAmt,
        },
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("Invest Amount History Array Updated");
    const result = await User.findByIdAndUpdate(
      req.params.id,
      {
        wantToInvest: true,
      },
      { new: true, runValidators: true, context: "query" }
    );
    console.log("wantToInvest status Updated");
    res.json(result);
  } catch (error) {
    res.json(error);
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
