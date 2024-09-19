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
        // default: Date.now,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
    },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
