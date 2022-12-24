const mongoose = require("mongoose");
const User = require("./user");
const Job = require("./jobs");

const JobsAppliedSchema = new mongoose.Schema({
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

module.exports = mongoose.model("JobsApplied", JobsAppliedSchema);
