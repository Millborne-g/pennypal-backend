// controllers/expenseController.js

const Expense = require('../models/expenseModel');

// Controller to get all expenses
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to add a new expense
exports.addExpense = async (req, res) => {
  const { amount, category, user } = req.body;

  try {
    const newExpense = new Expense({ amount, category, user });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};  


// Controller to delete an expense by ID
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense deleted successfully', deletedExpense });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to get expenses for a specific year
exports.getExpensesByYear = async (req, res) => {
  const { year } = req.params;
  try {
    const expenses = await Expense.find({
      // Assuming your date field is named 'date'
      date: {
        $gte: new Date(`${year}-01-01`),
        $lte: new Date(`${year}-12-31T23:59:59.999Z`),
      },
    });

    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getExpensesByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (error) {
    console.error('Error querying expenses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller to get expenses by date range
exports.getExpenseByDateRange = async (req, res) => {
  const { userId, startDate, endDate } = req.params;

  try {
    const expenses = await Expense.find({
      user: userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(`${endDate}T23:59:59.999Z`)
      }
    });

    res.json(expenses);
  } catch (error) {
    console.error('Error querying expenses by date range:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
