const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question:  String,
    correctAns: [String],
    incorrectAns: [String],
    options: [String],
    mark: Number,
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;