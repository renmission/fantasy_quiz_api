const express = require('express');
const router = express.Router();
const questionController = require('./../controllers/questionController');

router
  .route('/')
  .get(questionController.getQuestion)
  .post(questionController.postQuestion);

module.exports = router;
