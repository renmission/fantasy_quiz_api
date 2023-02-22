const mongoose = require("mongoose");

const resultSchema = mongoose.Schema({
  id: { type: Number },
  answer: [
    {
      questionID: { type: Number },
      value: { type: String },
      letter: { type: String },
    },
  ],
  score: { type: Number },
});

module.exports = mongoose.model("Answer", resultSchema);
