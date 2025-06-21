const express = require("express");
const { body } = require("express-validator");
const { login, Signup } = require("../controllers/Auth.controller");

const AuthRoutes = express.Router();

AuthRoutes.post("/login", login);
AuthRoutes.post(
  "/signup",
  [
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("Name Must be Minimum 3 Character Longer "),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password Must be 5 Character Longer"),
  ],
  Signup
);

module.exports = AuthRoutes;
