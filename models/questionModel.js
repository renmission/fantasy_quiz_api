const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  name: String,
  question: String,
  correctAnswer: { type: Number, select: false },
  options: [
    {
      questionID: { type: Number },
      value: { type: String },
      letter: { type: String },
    },
  ],
  weight: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
