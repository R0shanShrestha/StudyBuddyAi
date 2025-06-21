const { validationResult } = require("express-validator");
const User = require("../model/User");
const login = async (req, res) => {
  const { password, email } =  req.body;
  console.log(password)
  if (password == undefined || email == undefined) {
    return res.status(400).json({ msg: "Invalid Credientials !" });
  }

  //   Checking Email
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid Credientials !" });
  }
  //   Checking Password
  let comPassword = await user.decHash(password);
  if (!comPassword) {
    return res.status(400).json({ msg: "Invalid Credientials !" });
  }

  // Generate  & Set AccessToken
  const token = await user.tokenGen();
  res.cookie("authtoken", token);
  res.status(200).json({ authtoken: `Bearer ${token}`, user: user });
  res.send("Login");
};

const Signup = async (req, res) => {
  const { fullname, password, email } = req.body;
  // console.log(req.body)
  const isError = validationResult(req);
  if (!isError.isEmpty()) {
    return res.status(400).json({ msg: isError.array() });
  }

  //   Check if already exist email
  let isEmail = await User.findOne({ email: email });
  if (isEmail) {
    return res.status(400).json({ msg: "Email Already Exists!" });
  }
  //   Hashpassword
  let hashPassword = await User.hashPassword(password);
  let createUser = await User.create({
    fullname,
    email,
    password: hashPassword,
  });

  if (!createUser) {
    return res
      .status(400)
      .json({ msg: "Failed to Sign up ! Please try Again" });
  }

  // Generate  & Set AccessToken
  const token = await createUser.tokenGen();
  res.cookie("authtoken", token);

  res.status(201).json({ authtoken: `Bearer ${token}`, user: createUser });

  //   res.send("Welcome")
};

module.exports = { login, Signup };
