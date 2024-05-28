const mongoose = require('mongoose');

const TestResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  result: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const TestResult = mongoose.model('TestResult', TestResultSchema);

module.exports = TestResult;
