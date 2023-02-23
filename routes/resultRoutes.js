const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const resultController = require("./../controllers/resultController");


router
  .route("/")
  .post(resultController.createResult)
  .get(resultController.getAllResult)

router
  .route("/:id")
  .post(resultController.updateResult)
  .get(resultController.deleteResult)

module.exports = router;