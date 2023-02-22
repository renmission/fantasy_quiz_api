const express = require('express');
const router = express.Router();
const questionController = require('./../controllers/questionController');

router
  .route('/')
  .get(questionController.getQuestion)
  .post(questionController.postQuestion);

router
  .route("/results")
  .post(questionController.postResults);

module.exports = router;
