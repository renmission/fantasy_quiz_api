const Result = require('../models/resultModel');
const Question = require('../models/questionModel');
const factory = require('./handlerFactory');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/APIFeatures');


exports.getAllResult = factory.getAll(Result);
exports.getResult = factory.getOne(Result);
exports.createResult = factory.createOne(Result);


exports.postResults = catchAsync(async (req, res) => {
    try {
      let score = 0;
      const answerBody = req.body;
      console.log("req.bod", answerBody);
      const QuestionModel = await Question.find({}, "+correctAnswer +weight");
      const compareAnswer = answerBody.map((item) => {
        const compareQuestion = QuestionModel.find(
          (comparator) => comparator.id === item.id
        );
        if (compareQuestion.correctAnswer === item.questionID) {
          score += compareAnswer.weight;
          return { ...item, correct: true };
        } else {
          return { ...item, correct: false };
        }
      });
  
      const newResults = new Results({
        id: req.id,
        answer: compareAnswer,
        score: score,
      });
  
      // const answers = new Answer({
      //   id: req.id,
      //   answer: compareAnswer,
      // });
  
      await newResults.save();
      // await answers.save();
      console.log("correct", compareAnswer);
      console.log("results", newResults);
  
      res.status(201).json({ newResults, compareAnswer });
    } catch (error) {}
  });
