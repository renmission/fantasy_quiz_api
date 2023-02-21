const mongoose = require("mongoose");

const resultModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  result: { type: Array, default: [] },
  attempts: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  achived: { type: String, default: "" },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const Result = mongoose.model("Result", resultModel);

module.exports = Result;
