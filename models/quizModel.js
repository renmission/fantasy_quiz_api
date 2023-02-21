const mongoose = require('mongoose');

// Define the Quiz schema
const quizSchema = new mongoose.Schema({
    points : { type : Number, default : 0},
    attempts : { type : Number, default : 0},
    result : { type : Array, default : []},
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;