const mongoose = require("mongoose");



const testSchema = new mongoose.Schema({
  name: String,
  questionsList: [
    {
      questionType: String,
      question: String,
      options:  [
        {
          questionID: { type: Number },
          value: { type: String },
          letter: { type: String },
        }
      ],
      answer: { type: Number, select: false },
      weight: Number,
      
    },
  ],
  totalWeight: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
