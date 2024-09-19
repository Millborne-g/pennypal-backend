// models/Income.js

const mongoose = require("mongoose");

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

const Income = mongoose.model("Income", incomeSchema);

module.exports = Income;
