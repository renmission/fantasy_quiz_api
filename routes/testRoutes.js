const express = require('express');
const router = express.Router();
const testController = require('../controllers/testController');

router
  .route('/')
  .get(testController.getAllTest)
  .post(testController.createTest);

router
  .route('/:id')
  .get(testController.getTest)
  .patch(testController.updateTest)
  .delete(testController.deleteTest);

module.exports = router;
