const express = require("express");
const { authenticateToken } = require("../middleware/login");
const router = express.Router();
const {
  getAllJobs,
  getJob,
  postJob,
  renderEditForm,
  deleteJob,
  updateJob,
  getAppliedApplicants,
} = require("../controllers/jobs");

router.route("/jobs").get(getAllJobs).post(authenticateToken, postJob);
router.route('/jobs/:user').get(getJob)
router.route("/jobs/:id").get(getJob).delete(deleteJob);
router.route("/jobs/edit/:id").get(renderEditForm).put(updateJob);
router.route("/jobs/:id/applicants").get(getAppliedApplicants);

module.exports = router;
