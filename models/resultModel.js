const mongoose = require("mongoose");

const resultModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  quizHistory: [
    {
      testID: Number,
      score: Number,
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Result = mongoose.model("Result", resultModel);

module.exports = Result;
