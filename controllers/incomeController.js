// controllers/IncomeController.js

const Income = require("../models/incomeModel");

// Controller to get all Income
exports.getAllIncome = async (req, res) => {
    try {
        const income = await Income.find();
        res.json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to add a new income
exports.addIncome = async (req, res) => {
    const { amount, category, user, note, date } = req.body;

    try {
        const newIncome = new Income({ amount, category, user, note, date });
        const savedIncome = await newIncome.save();
        res.status(201).json(savedIncome);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to delete an income by ID
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.json({ message: "Income deleted successfully", deletedIncome });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get incomes for a specific year
exports.getIncomesByYear = async (req, res) => {
    const { year } = req.params;

    try {
        const incomes = await Income.find({
            // Assuming your date field is named 'date'
            date: {
                $gte: new Date(`${year}-01-01`),
                $lte: new Date(`${year}-12-31T23:59:59.999Z`),
            },
        });

        res.json(incomes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getIncomesByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const incomes = await Income.find({ user: userId });

        res.json(incomes);
    } catch (error) {
        console.error("Error querying expenses:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Controller to get income by date range
exports.getExpenseByDateRange = async (req, res) => {
    const { userId, startDate, endDate } = req.params;

    try {
        const incomes = await Income.find({
            user: userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(`${endDate}T23:59:59.999Z`),
            },
        });

        res.json(incomes);
    } catch (error) {
        console.error("Error querying expenses by date range:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
