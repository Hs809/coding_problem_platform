// Create a schema for the TestCase model
const testCaseSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  input: {
    type: String,
    required: true,
  },
  expectedOutput: {
    type: String,
    required: true,
  },
});

// Create the TestCase model using the testCaseSchema
module.exports = mongoose.model("TestCase", testCaseSchema);
