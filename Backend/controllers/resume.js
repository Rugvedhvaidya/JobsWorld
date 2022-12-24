const Resume = require("../models/resume");

// This controller is called when the user requests for details of his/her resume.
exports.getResume = async (req, res) => {
  const { user_id } = req;
  try {
    const resume = await Resume.findOne({ user_id: `${user_id}` });
    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is called when the user posts resume.
exports.postResume = async (req, res) => {
  const { user_id } = req;
  const {
    firstName,
    lastName,
    currentCity,
    postalCode,
    email,
    phone,
    degree,
    fieldOfStudy,
    college,
    year,
    jobTitle,
    company,
    jobCity,
    jobYear,
    jobDesc,
    skills,
  } = req.body;

  try {
    const resume = await Resume.create({
      user_id,
      firstName,
      lastName,
      currentCity,
      postalCode,
      email,
      phone,
      degree,
      fieldOfStudy,
      college,
      year,
      jobTitle,
      company,
      jobCity,
      jobYear,
      jobDesc,
      skills,
    });

    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is called when the user requests for an update in the resume.
// This controller sends all resume details to the user.
exports.renderEditForm = async (req, res) => {
  const { user_id } = req;
  try {
    const resume = await Resume.findOne({ user_id: `${user_id}` });
    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This contoller is called when user updates a resume.
exports.updateResume = async (req, res) => {
  const { id } = req.params;
  const {
    user_id,
    firstName,
    lastName,
    currentCity,
    postalCode,
    email,
    phone,
    degree,
    fieldOfStudy,
    college,
    year,
    jobTitle,
    company,
    jobCity,
    jobYear,
    jobDesc,
    skills,
  } = req.body;

  try {
    const resume = await Resume.findByIdAndUpdate(id, {
      firstName,
      lastName,
      currentCity,
      postalCode,
      email,
      phone,
      degree,
      fieldOfStudy,
      college,
      year,
      jobTitle,
      company,
      jobCity,
      jobYear,
      jobDesc,
      skills,
    });
    await resume.save();
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

// This controller is called when user requests to delete a resume.
exports.deleteResume = async (req, res) => {
  const { id } = req.params;
  try {
    await Resume.findByIdAndDelete(id);
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

// This controller is used to send resume details based on user_id of the user.
exports.getApplicantResume = async (req, res) => {
  const { id } = req.params;
  try {
    const resume = await Resume.findOne({ user_id: `${id}` });
    res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};
