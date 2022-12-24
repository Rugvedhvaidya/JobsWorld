const express = require("express");
const router = express.Router();
const {
  getUser,
  signup,
  login,
  getPostedJobs,
  getAppliedJobs,
  updateAppliedJobs,
  imageUpload,
  imageDelete
} = require("../controllers/users");
const { authenticateToken } = require("../middleware/login");
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.route("/signup").post(signup);
router.route("/login").post(login);

router.route("/upload/:id")
  .post(upload.single("image"), imageUpload)
  .delete(authenticateToken, imageDelete);

router.route("/user").get(authenticateToken, getUser);

router.route("/user-postings").get(authenticateToken, getPostedJobs);

router
  .route("/jobsapplied")
  .get(authenticateToken, getAppliedJobs)
  .post(authenticateToken, updateAppliedJobs);

module.exports = router;
