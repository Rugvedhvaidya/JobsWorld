const express = require("express");
const { authenticateToken } = require("../middleware/login");
const router = express.Router();
const {
  getResume,
  postResume,
  renderEditForm,
  deleteResume,
  updateResume,
  getApplicantResume,
} = require("../controllers/resume");

router
  .route("/resume")
  .get(authenticateToken, getResume)
  .post(authenticateToken, postResume);
router.route("/resume/:id").delete(authenticateToken, deleteResume);
router.route("/resume/edit").get(authenticateToken, renderEditForm);
router.route("/resume/edit/:id").put(authenticateToken, updateResume);
router.route("/resume/:id").get(getApplicantResume);

module.exports = router;
