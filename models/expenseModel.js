// models/Expense.js

const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
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

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
