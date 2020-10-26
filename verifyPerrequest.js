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
    User.findById(verified, "isBlocked", (err, result) => {
      if (err) {
        console.log("error from verify token per request");
        return res.status(400).send("Session expired,Kindly login again");
      } else {
        const verifyBlock = result.isBlocked;
        if (!verifyBlock) {
          next();
        } else {
          console.log("user Blocked");
          return res.status(400).send("blocked");
        }
      }
    });

    // if (req.user._id == "5f00326f41344403fcc7826e") return next();
    // res.status(400).send("ADMIN ONLY");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
