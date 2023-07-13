const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getSubmission,
} = require("../controllers/submissionController");

const { isLoggedIn } = require("../middlewares/user");

router.route("/submission").post(isLoggedIn, createSubmission);
router.route("/submission").get(isLoggedIn, getSubmission);

module.exports = router;
