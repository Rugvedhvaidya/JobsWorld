const mongoose = require("mongoose");
const User = require("./user");

const jobSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  owner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  company_description: {
    type: String,
    required: true,
  },
  company_location: {
    type: String,
    required: true,
  },
  number_of_postings: {
    type: Number,
    required: true,
    min: 0,
  },
  job_title: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  role_category: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: 0,
  },
  work_experience: {
    type: Number,
    required: true,
    min: 0,
  },
  job_type: {
    type: String,
    enum: ["FullTime", "Contract", "Temporary", "Fresher", "Internship"],
  },
  education_level: {
    type: String,
    enum: [
      "Bachelor's Degree",
      "Master's Degree",
      "Doctoral Degree",
      "Diploma",
      "12th Pass",
      "10th pass",
    ],
  },
  skills: [
    {
      type: String,
      enum: ["Java", "Python", "JavaScript", "Angular", "ReactJS"],
    },
  ],
  applicant_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Job", jobSchema);
