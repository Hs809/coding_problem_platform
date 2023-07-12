const BigPromise = require("../middlewares/bigPromise");
const Question = require("../model/question");
const CustomError = require("../utils/customeError");

exports.createQuestion = BigPromise(async (req, res, next) => {
  const { questionText, solution } = req.body;

  // Validate the request body
  if (!questionText || !solution) {
    return next(new CustomError("Missing required fields", 400));
  }

  const question = await Question.create({
    questionText,
    solution,
  });
  res
    .status(200)
    .json({ question, message: "Created question successfully!!" });
});
exports.updateQuestion = BigPromise(async (req, res, next) => {
  const { questionText, solution, id } = req.body;

  // Validate the request body
  if (!questionText || !solution || !id) {
    return next(new CustomError("Missing required fields", 400));
  }
  const existingQuestion = await Question.findByIdAndUpdate(id, {
    questionText,
    solution,
  });
  res
    .status(200)
    .json({ existingQuestion, message: "question updated successfully" });
});
exports.deleteQuestion = BigPromise(async (req, res, next) => {
  const { id } = req.body;

  // Validate the request body
  if (!id) {
    return next(new CustomError("Missing required fields", 400));
  }
  const existingQuestion = await Question.findByIdAndDelete(id);
  res
    .status(200)
    .json({ existingQuestion, message: "question deleted successfully" });
});
