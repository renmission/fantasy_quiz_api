const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('../utils/APIFeatures');

exports.getAll = Model =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.questionID) filter = { product: req.params.questionID };

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

  

exports.getOne = Model => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    const doc = await query;

    if(!doc) {
        return next(new AppError('No document found with that ID', 404))
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    });
});

exports.createOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    console.log(doc);
    
    if(!doc) {
        return next(new AppError('No document found with this ID',404));
    }

    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    })
});
exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidate: true
    });

    if(!doc) {
        return next(new AppError('No document found with this ID',404));
    }

    res.status(200).json({
        status: 'success',
        data: {
            data: doc
        }
    })
});
exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc) {
        return next(new AppError('No document found with this ID',404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    })
});
