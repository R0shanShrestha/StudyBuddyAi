const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JwtKey } = require("../config/ServerConfig");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
      default:
        "https://photosrush.net/wp-content/uploads/instagram-profile-picture-girl-back-side_52.webp",
    },

    uploads: [
      {
        title: {
          type: String,
        },
        data: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.tokenGen = async function (password) {
  return await jwt.sign({ id: this._id }, JwtKey, { expiresIn: "3d" });
};
UserSchema.methods.decHash = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
