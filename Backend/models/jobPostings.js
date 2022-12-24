const mongoose = require("mongoose");
const User = require("./user");
const Job = require("./jobs");

const JobPostingsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  job_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
  ],
});

module.exports = mongoose.model("JobPosting", JobPostingsSchema);
