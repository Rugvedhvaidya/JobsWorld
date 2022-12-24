const Shortlist = require("../models/shortlist");

// This controller is used to send all the shortlisted jobs of the user.
exports.getShortlistedJobs = async (req, res) => {
  const { user_id } = req;
  try {
    const list = await Shortlist.findOne({ user_id: `${user_id}` });
    res.status(200).json({
      success: true,
      list,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error,
    });
  }
};

// This controller is used to update the shortlist of the user.
exports.updateShortlist = async (req, res) => {
  const { user_id } = req;
  const { jobId } = req.body;
  try {
    const shortlistObj = await Shortlist.findOne({ user_id: `${user_id}` });
    if (shortlistObj.job_ids.includes(jobId)) {
      await Shortlist.findByIdAndUpdate(shortlistObj._id, {
        $pull: { job_ids: jobId },
      });
    } else {
      shortlistObj.job_ids.push(jobId);
      await shortlistObj.save();
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
