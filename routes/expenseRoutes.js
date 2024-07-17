// routes/expenseRoutes.js

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Get all expenses
router.get('/expenses', expenseController.getAllExpenses);

// Add a new expense
router.post('/expenses/save', expenseController.addExpense);

// Delete an expense by ID
router.delete('/expenses/:id', expenseController.deleteExpense);

// Get expenses for a specific year
router.get('/expenses/year/:year', expenseController.getExpensesByYear);

// Get expenses for a specific userId
router.get('/expenses/user/:userId', expenseController.getExpensesByUserId);

router.post("/expenses/date-range", expenseController.getExpenseByDateRange);

module.exports = router;
