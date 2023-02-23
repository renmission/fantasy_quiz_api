const Question = require("../models/questionModel");
const Results = require("../models/resultsModel");
const catchAsync = require("../utils/catchAsync");
const factory = require("./handlerFactory");

exports.getAllResult = factory.getAll(Results);
exports.updateResult = factory.updateOne(Results);
exports.deleteResult = factory.deleteOne(Results);

// results post
exports.createResult = catchAsync(async (req, res) => {
  let score = 0;
  const answerBody = req.body;
  // console.log("req.bod", answerBody);
  const QuestionModel = await Question.find({}, "+correctAnswer +weight");
  const compareAnswer = answerBody.map((item) => {
    const compareQuestion = QuestionModel.find(
      (comparator) => comparator.id === item.answer.questionID
    );
    const correctAnswer = compareQuestion.correctAnswer;
    const answer = item.answer.questionID;
    console.log(correctAnswer === answer);
    if (answer === correctAnswer) {
      score += compareQuestion.weight;
      return { ...item.answer, correct: true };
    } else {
      return { ...item.answer, correct: false };
    }
  });

  const newResults = new Results({
    id: req.id,
    answer: compareAnswer,
    score: score,
  });

  await newResults.save();
  console.log("correct", compareAnswer);
  console.log("results", newResults);

  res.status(201).json({ newResults, compareAnswer });
});
