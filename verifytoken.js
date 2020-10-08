const jwt = require("jsonwebtoken");
const User = require("./models/user");

module.exports = function (req, res, next) {
  // const token = req.header("auth-token");
  if (req.headers.cookie === undefined) {
    return res.status(400).send("Log in Before Accessing this page");
  }
  const getCookie = (cname) => {
    var name = cname + "=";
    var ca = req.headers.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };
  const token = getCookie("token");
  console.log();

  if (!token) return res.status(400).send("ACCESS DENIED");
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    User.findById(verified, "isBlocked", (err, result) => {
      if (err) {
        console.log("error from verify token");
        return res
          .status(400)
          .send("error from verify token, cannot find user by token");
      } else {
        const verifyBlock = result.isBlocked;
        if (!verifyBlock) {
          req.user = verified;
          next();
        } else {
          console.log("user Blocked");
          return res.status(200).send("blocked");
        }
      }
    });

    // if (req.user._id == "5f00326f41344403fcc7826e") return next();
    // res.status(400).send("ADMIN ONLY");
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
