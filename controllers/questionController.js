const BigPromise = require("../middlewares/bigPromise");
const Question = require("../model/question");
const CustomError = require("../utils/customeError");
var accessToken = process.env.SPHERE_PROBLEM_TOKEN;
var endpoint = process.env.SPHERE_PROBLEM_END_POINT;
const axios = require("axios");

exports.createQuestion = BigPromise(async (req, res, next) => {
  const { questionText } = req.body;

  // Validate the request body
  if (!questionText) {
    return next(new CustomError("Missing required fields", 400));
  }

  // define request parameters
  var problemData = {
    name: questionText,
    masterjudgeId: 1001,
  };
  const response = await axios({
    method: "post",
    url: `https://${endpoint}/api/v4/problems?access_token=${accessToken}`,
    data: problemData,
  });
  const question = await Question.create({
    questionText,
    problemId: response.data.id,
  });
  res
    .status(200)
    .json({ question, message: "Created question successfully!!" });
});
exports.updateQuestion = BigPromise(async (req, res, next) => {
  const { questionText, problemId } = req.body;

  // Validate the request body
  if (!questionText || !problemId) {
    return next(new CustomError("Missing required fields", 400));
  }
  var problemData = {
    name: questionText,
  };

  await axios({
    method: "put",
    url: `https://${endpoint}/api/v4/problems/${problemId}?access_token=${accessToken}`,
    data: problemData,
  });
  const existingQuestion = await Question.findOne({ problemId });
  existingQuestion.questionText = questionText;
  await existingQuestion.save();
  res.status(200).json({
    existingQuestion,
    message: "question updated successfully",
  });
});
exports.deleteQuestion = BigPromise(async (req, res, next) => {
  const { problemId } = req.body;

  // Validate the request body
  if (!problemId) {
    return next(new CustomError("Missing required fields", 400));
  }
  await axios({
    method: "DELETE",
    url: `https://${endpoint}/api/v4/problems/${problemId}?access_token=${accessToken}`,
  });
  await Question.findOneAndDelete({ problemId });
  res.status(200).json({ message: "question deleted successfully" });
});
