const express = require('express');
const router = express.Router();
const resultController = require("./../controllers/resultController");

router
  .route("/")
  .get(resultController.getAllResult)
  .post(resultController.createResult);

router.route("/:id").get(resultController.getResult);

module.exports = router;