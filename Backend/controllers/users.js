const User = require("../models/user");
const Shortlist = require("../models/shortlist");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JobPosting = require("../models/jobPostings");
const JobsApplied = require("../models/jobsApplied");
const Job = require("../models/jobs");
const { cloudinary } = require('../config/cloudinary');


// This controller is used to send details of a particular user.
exports.getUser = async (req, res) => {
  const { user_id } = req;
  try {
    const user = await User.findById(user_id);
    res.status(200).json({
      success: true,
      user,
    });
  }
  catch (e) {
    res.status(404).json({
      success: false,
      e,
    })
  }
};

// This controller is used to create a user in the database.
exports.signup = async (req, res) => {
  const { user_name, email } = req.body;
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      user_name,
      email,
      password,
      profilepic: "",
    });
    await Shortlist.create({
      user_id: user._id,
      job_ids: [],
    });
    await JobPosting.create({
      user_id: user._id,
      job_ids: [],
    });
    await JobsApplied.create({
      user_id: user._id,
      job_ids: [],
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is used to send a jwt token to user.
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: `${email}` });
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      const payload = {
        user_id: user._id,
      };
      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
      res.send({ jwtToken });
    } else {
      res.status(400);
      res.send("Invalid Password!!!");
    }
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is used to send the details of all jobs posted by the user.
exports.getPostedJobs = async (req, res) => {
  const { user_id } = req;
  try {
    const jobs = await Job.find({ owner_id: `${user_id}` });
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is used to send all job ids which are applied by the user.
exports.getAppliedJobs = async (req, res) => {
  const { user_id } = req;
  try {
    const jobsApplied = await JobsApplied.findOne({ user_id: `${user_id}` });
    res.status(200).json({
      success: true,
      jobsApplied,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is used to update the job_ids applied by the user.
exports.updateAppliedJobs = async (req, res) => {
  const { user_id } = req;
  const { jobId } = req.body;
  try {
    let dbObject = await JobsApplied.findOne({ user_id: `${user_id}` });
    if (dbObject.job_ids.includes(jobId)) {
      await JobsApplied.findByIdAndUpdate(dbObject._id, {
        $pull: { job_ids: jobId },
      });
    } else {
      dbObject.job_ids.push(jobId);
      await dbObject.save();
    }

    
    dbObject = await Job.findById(jobId);
    if (dbObject.applicant_ids.includes(user_id)) {
      await Job.findByIdAndUpdate(dbObject._id, {
        $pull: { applicant_ids: user_id },
      });
    } else {
      dbObject.applicant_ids.push(user_id);
      await dbObject.save();
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.imageUpload = async (req, res) => {
  const { id } = req.params;
  const { path } = req.file;
  try {
    const user = await User.findById(id);
    user.profilepic = path;
    await user.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

exports.imageDelete = async (req, res) => {
  const { user_id } = req;
  try {
    const user = await User.findById(user_id);
    const path = user.profilepic.slice(61, 91);
    await cloudinary.uploader.destroy(path);
    user.profilepic = "";
    await user.save();
    res.status(200).json({
      success: true,
    })
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
}