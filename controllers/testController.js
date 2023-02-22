const Test = require('../models/testModel');
const factory = require('./handlerFactory');

exports.getAllTest = factory.getAll(Test);
exports.getTest = factory.getOne(Test);
exports.createTest = factory.createOne(Test);
exports.updateTest = factory.updateOne(Test);
exports.deleteTest = factory.deleteOne(Test);