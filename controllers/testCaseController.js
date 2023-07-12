const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customeError");
const Question = require("../model/question");
const axios = require("axios");
var accessToken = process.env.SPHERE_PROBLEM_TOKEN;
var endpoint = process.env.SPHERE_PROBLEM_END_POINT;

exports.createTestCase = BigPromise(async (req, res, next) => {
  const { input, output, problemId, timelimit } = req.body;
  var testcaseData = {
    input,
    output,
    timelimit,
    judgeId: 1,
  };

  // Validate the request body
  if (!input || !output || !problemId || !timelimit) {
    return next(new CustomError("Missing required fields", 400));
  }

  // Find the question by its ID
  const question = await Question.findOne({ problemId });
  if (!question) {
    return next(new CustomError("Question not found", 404));
  }
  //   save the testcase in sphere engine
  await axios({
    method: "post",
    url: `https://${endpoint}/api/v4/problems/${problemId}/testcases?access_token=${accessToken}`,
    data: testcaseData,
  });
  res.status(201).json({
    message: "Test case added successfully",
  });
});
