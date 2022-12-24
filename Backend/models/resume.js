const mongoose = require("mongoose");
const User = require("./user");

const resumeSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  currentCity: {
    type: String,
    required: true,
  },
  postalCode: {
    type: Number,
    required: true,
    minlength: 0,
    maxlength: 6,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  fieldOfStudy: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  jobCity: {
    type: String,
    required: true,
  },
  jobYear: {
    type: String,
    required: true,
  },
  jobDesc: {
    type: String,
    required: true,
  },
  skills: {
    c: {
      type: Boolean,
      default: false,
    },
    cpp: {
      type: Boolean,
      default: false,
    },
    python: {
      type: Boolean,
      default: false,
    },
    java: {
      type: Boolean,
      default: false,
    },
  },
});

module.exports = mongoose.model("Resume", resumeSchema);
