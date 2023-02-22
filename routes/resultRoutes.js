const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authController');
const resultController = require("./../controllers/resultController");

router
  .route("/")
  .get(authController.isLoggedIn, resultController.getAllResult)
  .post(authController.isLoggedIn, resultController.createResult);

router.route("/:id").get(authController.isLoggedIn, resultController.getResult);

module.exports = router;