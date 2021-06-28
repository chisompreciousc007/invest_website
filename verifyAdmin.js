const jwt = require("jsonwebtoken");
const User = require("./models/user");

module.exports = function (req, res, next) {
  if (req.cookies.token === undefined) {
    return res.status(400).send("Log in Before Accessing this page");
  }
  const token = req.cookies.token;

  if (!token) return res.status(400).send("ACCESS DENIED");
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    if (verified._id === process.env.ADMIN_MONGODB_ID) {
      return next();
    }
    res.status(400).send("ADMIN ONLY");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
