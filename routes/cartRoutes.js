const express = require('express');
const router = express.Router();
const cartController = require('./../controllers/cartController');

router
  .route('/')
  .get(cartController.getAllCart)
  .post(cartController.createCart);

router
  .route('/:id')
  .get(cartController.getCart)
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

module.exports = router;
