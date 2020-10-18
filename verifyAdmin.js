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

  if (!token) return res.status(400).send("ACCESS DENIED");
  try {
    const verified = jwt.verify(token, process.env.SECRET);
    if (verified._id === "5f7ec49437499e0db0cf1592") {
      return next();
    }
    res.status(400).send("ADMIN ONLY");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
