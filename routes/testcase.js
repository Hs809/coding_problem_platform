const express = require("express");
const router = express.Router();
const { createTestCase } = require("../controllers/testCaseController");

const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/testcase").post(isLoggedIn, customRole("admin"), createTestCase);

module.exports = router;
