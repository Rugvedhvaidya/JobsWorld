const express = require("express");
const router = express.Router();
const {
  getShortlistedJobs,
  updateShortlist,
} = require("../controllers/shortlist");
const { authenticateToken } = require("../middleware/login");
router
  .route("/shortlist")
  .get(authenticateToken, getShortlistedJobs)
  .post(authenticateToken, updateShortlist);
module.exports = router;
