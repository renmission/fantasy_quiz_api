const User = require('../models/userModel');
const factory = require('./handlerFactory');


exports.createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined!, please use /signup instead!'
    });
};

exports.getAllUser = factory.getAll(User);
exports.getUser = factory.getOne(User);
// exports.createUser = factory.createOne(User);  // it should used in auth 
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);