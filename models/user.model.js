
const mongoose = require("mongoose");

const generate = require("../helpers/generate");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  phone: Number,
  avatar: String,
  status: {
    type: String,
    default: "active"
  },
  tokenUser: {
    type: String,
    default: generate.generateRandomString(30),
  },
  deleted: {
    type: Boolean,
    default: false
  },
  deleteAt: Date,
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema, "users");

module.exports = User;