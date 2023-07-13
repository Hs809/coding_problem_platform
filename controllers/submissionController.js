const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customeError");
var accessToken = process.env.SPHERE_PROBLEM_TOKEN;
var endpoint = process.env.SPHERE_PROBLEM_END_POINT;
const axios = require("axios");

exports.createSubmission = BigPromise(async (req, res, next) => {
  const { problemId, source } = req.body;

  // Validate the request body
  if (!problemId || !source) {
    return next(new CustomError("Missing required fields", 400));
  }

  // define request parameters
  var submissionData = {
    problemId,
    compilerId: 116,
    source: source,
  };

  const response = await axios({
    method: "post",
    url: `https://${endpoint}/api/v4/submissions?access_token=${accessToken}`,
    data: submissionData,
  });
  console.log({ responseId: response.data.id });
  res.status(200).json({
    submissionId: response.data.id,
    message: "solution submitted successfully",
  });
});

exports.getSubmission = BigPromise(async (req, res, next) => {
  const { submissionId } = req.query;
  console.log({ submissionId });
  // Validate the request body
  if (!submissionId) {
    return next(new CustomError("Missing required fields", 400));
  }
  const response = await axios({
    method: "get",
    url: `https://${endpoint}/api/v4/submissions/${submissionId}?access_token=${accessToken}`,
  });
  console.log({ response: JSON.stringify(response.data.result) });
  res.status(200).send(JSON.stringify(response.data.result));
});
