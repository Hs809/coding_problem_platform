const express = require("express");
const router = express.Router();
const {
  createSubmission,
  getSubmission,
  listSubmission,
} = require("../controllers/submissionController");

const { isLoggedIn } = require("../middlewares/user");

router.route("/submission").post(isLoggedIn, createSubmission);
router.route("/submission").get(isLoggedIn, getSubmission);
router.route("/all_submission").get(isLoggedIn, listSubmission);

module.exports = router;
