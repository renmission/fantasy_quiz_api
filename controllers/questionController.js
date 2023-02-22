const Question = require("../models/questionModel");
const Results = require("../models/resultsModel");
const Answer = require("../models/answerModel");
const catchAsync = require("../utils/catchAsync");

// get question
const getQuestion = catchAsync(async (req, res) => {
  try {
    const question = await Question.find();

    res.status(200).json(question);
  } catch (error) {
    console.log(error);
  }
});

// post question
const postQuestion = catchAsync(async (req, res) => {
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

// results post
const postResults = catchAsync(async (req, res) => {
  try {
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

module.exports = {
  getQuestion,
  postQuestion,
  postResults,
};

