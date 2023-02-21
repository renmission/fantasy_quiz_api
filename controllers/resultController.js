const Result = require('../models/resultModel');
const factory = require('./handlerFactory');

exports.getAllResult = factory.getAll(Result);
exports.getResult = factory.getOne(Result);
exports.createResult = factory.createOne(Result);
