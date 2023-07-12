// Assuming you have installed and required the mongoose library
const mongoose = require("mongoose");

// Create a schema for the Question model
const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  problemId: {
    type: Number,
    required: true,
    unique: true,
  },
  // solution: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = mongoose.model("Question", questionSchema);
