const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: [true, "Please enter the username"],
    maxLength: 20,
  },

  email: {
    type: String,
    required: [true, "Please enter the email"],
    unique: true,
    sparse: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
