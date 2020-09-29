const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // const token = req.header("auth-token");
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

  if (!token) return res.status(400).send("ACCESS DENieD");
  try {
    const verified = jwt.verify(token, process.env.SECRET);

    req.user = verified;
    next();
    // if (req.user._id == "5f00326f41344403fcc7826e") return next();
    // res.status(400).send("ADMIN ONLY");
  } catch (error) {
    res.status(400).send("INVALID TOKEN");
  }
};
