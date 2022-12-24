const Job = require("../models/jobs");
const JobPosting = require("../models/jobPostings");
const JobsApplied = require("../models/jobsApplied");

// This controller is called when the user requests for all jobs in the database
exports.getAllJobs = async (req, res) => {
  let {
    company_location = "",
      job_title = "",
      salary = 0,
      job_type = "",
      skills = "",
      education_level = "",
      company_name = "",
      sort = "",
  } = req.query;

  if (salary !== undefined) {
    salary = parseInt(salary);
  } else {
    salary = 0;
  }
  let jobs;
  
      if (sort) {
        try {
          jobs = await Job.find({
            company_location: {
              $regex: `${company_location}`,
              $options: "i"
            },
            job_title: {
              $regex: `${job_title}`,
              $options: "i"
            },
            salary: {
              $gt: `${salary}`
            },
            job_type: {
              $regex: `${job_type}`,
              $options: "i"
            },
            skills: {
              $regex: `${skills}`,
              $options: "i"
            },
            education_level: {
              $regex: `${education_level}`,
              $options: "i"
            },
            company_name: {
              $regex: `${company_name}`,
              $options: "i"
            },
          }).sort({
            salary: `${sort}`
          });
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
      } else {
        try {
          jobs = await Job.find({
            company_location: {
              $regex: `${company_location}`,
              $options: "i"
            },
            job_title: {
              $regex: `${job_title}`,
              $options: "i"
            },
            salary: {
              $gt: `${salary}`
            },
            job_type: {
              $regex: `${job_type}`,
              $options: "i"
            },
            skills: {
              $regex: `${skills}`,
              $options: "i"
            },
            education_level: {
              $regex: `${education_level}`,
              $options: "i"
            },
            company_name: {
              $regex: `${company_name}`,
              $options: "i"
            },
          });
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
      }
};

// This controller is called when the user requests for details of one job in the database
exports.getJob = async (req, res) => {
  const {
    user
  } = req.params;
  try {
    const details = await Job.findById(user);
    res.status(200).json({
      success: true,
      details,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is called when the user posts a job in the database
exports.postJob = async (req, res) => {
  const owner_id = req.user_id;
  const {
    company_name,
    role,
    company_description,
    company_location,
    number_of_postings,
    job_title,
    job_description,
    role_category,
    salary,
    work_experience,
    job_type,
    education_level,
    skills,
  } = req.body;

  try {
    const job = await Job.create({
      company_name,
      role,
      owner_id,
      company_description,
      company_location,
      number_of_postings,
      job_title,
      job_description,
      role_category,
      salary,
      work_experience,
      job_type,
      education_level,
      skills,
    });
    const jobPostingsObj = await JobPosting.findOne({
      user_id: `${owner_id}`
    });
    jobPostingsObj.job_ids.push(job._id);
    await jobPostingsObj.save();
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }

};

// This controller is used to render a edit form with filled job details
// when the user requests for editing a job posted by him.
exports.renderEditForm = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const job = await Job.findById(id);
    res.status(200).json({
      success: true,
      jobDetails: job,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is used to update the details of the job
exports.updateJob = async (req, res) => {
  const {
    id
  } = req.params;
  const {
    company_name,
    company_description,
    company_location,
    number_of_postings,
    job_title,
    job_description,
    role_category,
    salary,
    work_experience,
    job_type,
    education_level,
    skills,
  } = req.body;
  try {
    const job = await Job.findByIdAndUpdate(id, {
      company_name,
      company_description,
      company_location,
      number_of_postings,
      job_title,
      job_description,
      role_category,
      salary,
      work_experience,
      job_type,
      education_level,
      skills,
    });
    await job.save();
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

// This controller is used to delete a job.
exports.deleteJob = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    await Job.findByIdAndDelete(id);
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

// This controller is used to send all applicants for a given job.
exports.getAppliedApplicants = async (req, res) => {
  const {
    id
  } = req.params;
  try {
    const job = await Job.findById(id);
    const {
      applicant_ids
    } = job;
    res.status(200).json({
      success: true,
      applicant_ids,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};
