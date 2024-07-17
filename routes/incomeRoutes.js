// routes/IncomeRoutes.js

const express = require('express');
const router = express.Router();
const incomeController = require('../controllers/incomeController');

// Get all Incomes
router.get('/income', incomeController.getAllIncome);

// Add a new balance
router.post('/income/save', incomeController.addIncome);

// Delete an income by ID
router.delete('/income/:id', incomeController.deleteIncome);

// Get incomes for a specific year
router.get('/income/year/:year', incomeController.getIncomesByYear);

// Get expenses for a specific userId
router.get('/income/user/:userId', incomeController.getIncomesByUserId);

router.post("/income/date-range", incomeController.getExpenseByDateRange);

module.exports = router;
