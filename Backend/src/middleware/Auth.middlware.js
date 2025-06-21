const { JwtKey } = require("../config/ServerConfig");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const AuthMiddleware = async (req, res, next) => {
  // Check token
  let token = req.cookies.authtoken || req.headers.authorization;
  token = token.split(" ")[1] || token;
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized Access" });
  }

  //   Verifying token
  const verifyToken = jwt.verify(token, JwtKey);
  if (!verifyToken) {
    return res.status(401).json({ msg: "Unauthorized Access" });
  }

  //   Checking the content verifed is existed in db ?

  let user = await User.findById(verifyToken.id);
  if (!user) {
    return res.status(401).json({ msg: "Unauthorized Access" });
  }
  req.user = user;
  next();
};

module.exports = { AuthMiddleware };
