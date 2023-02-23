const Question = require("../models/questionModel");
const Results = require("../models/resultsModel");
// const Answer = require("../models/answerModel");
const catchAsync = require("../utils/catchAsync");


exports.getQuestion = catchAsync(async (req, res) => {
  try {
    const question = await Question.find();

    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
});


exports.postQuestion = catchAsync(async (req, res) => {
  try {
    const options = req.body.option.map((opt) => {
      return {
        questionID: opt.questionID,
        value: opt.value,
        letter: opt.letter,
      };
    });
    const question = await Question.create({
      id: req.body.id,
      question: req.body.question,
      option: options,
      correctAnswer: req.body.correctAnswer,
      type: req.body.type,
      weight: req.body.weight,
    });

    res.status(201).json(question);
  } catch (error) {
    console.log(error);
  }
});



