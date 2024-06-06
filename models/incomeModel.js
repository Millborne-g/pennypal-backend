// models/Income.js

const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user:{
    type: String,
    required: true,
  }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
