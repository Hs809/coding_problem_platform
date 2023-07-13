const express = require("express");
const router = express.Router();
const {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  listQuestions,
} = require("../controllers/questionController");

const { isLoggedIn, customRole } = require("../middlewares/user");

router.route("/question").post(isLoggedIn, customRole("admin"), createQuestion);
router.route("/question").put(isLoggedIn, customRole("admin"), updateQuestion);
router.route("/question").get(isLoggedIn, listQuestions);
router
  .route("/question")
  .delete(isLoggedIn, customRole("admin"), deleteQuestion);

module.exports = router;
