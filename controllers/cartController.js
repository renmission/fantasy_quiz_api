const Cart = require('./../models/cartModel');
const factory = require('./handlerFactory');

exports.getAllCart = factory.getAll(Cart);
exports.getCart = factory.getOne(Cart);
exports.createCart = factory.createOne(Cart);
exports.updateCart = factory.updateOne(Cart);
exports.deleteCart = factory.deleteOne(Cart);