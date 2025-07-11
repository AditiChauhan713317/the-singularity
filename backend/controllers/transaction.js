import Transaction from '../models/transaction.js';
import mongoose from 'mongoose';
import redisClient from '../utils/redisClient.js';
import { buildDateFilter  } from '../utils/buildDateFilter.js';


// CREATE a new transaction
const createTransaction = async (req, res) => {
    const userId = req.user._id;
    const { amount, type, category, description, date } = req.body;

    if (!amount || !type || !category || !date) {
        return res.status(400).json({ error: 'Required fields missing' });
    }

    try {
        const transaction = await Transaction.create({
            userId,
            amount,
            type,
            category,
            description,
            date
        });
        res.status(201).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// GET all transactions for user (optionally filter by month/year/week or date)+ pagination + redis caching
const getTransactions = async (req, res) => {
    const userId = req.user._id;
    const { date, month, year, week, page = 1, limit = 5 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const query = { userId };

    // create redis key
    const filterKey = JSON.stringify({ userId, date, month, year, week, page: pageNum, limit: limitNum });
    const cacheKey = `transactions:list:${filterKey}`;

    try {
        // Check Redis first
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }

        // Build filter
        const dateFilter = buildDateFilter({ date, month, year, week });
        if (dateFilter) query.date = dateFilter;

        const transactions = await Transaction.find(query)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limitNum);

        // Total count for pagination
        const total = await Transaction.countDocuments(query);

        const response = {
            transactions,
            total,
            page: pageNum,
            limit: limitNum,
            totalPages: Math.ceil(total / limitNum),
        };

        await redisClient.setEx(cacheKey, 300, JSON.stringify(response));
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// UPDATE a transaction
const updateTransaction = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such transaction found' });
    } 

    const userId = req.user._id;

    try {
        const transaction = await Transaction.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
        
        // Clear all caches for this user
        const keys = await redisClient.keys(`transactions:{"userId":"${userId}"*}`);
        for (const key of keys) {
            await redisClient.del(key);
        }

        
        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// DELETE a transaction
const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such transaction found' });
    } 

    const userId = req.user._id;
    try {
        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) return res.status(404).json({ error: 'Transaction not found' });

        // Clear all caches for this user
        const keys = await redisClient.keys(`transactions:{"userId":"${userId}"*}`);
        for (const key of keys) {
            await redisClient.del(key);
        }


        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// get transaction stats (daily/weekly/monthly/yearly)
const getTransactionStats = async (req, res) => {
    const userId = req.user._id;
    const { date, month, year, week } = req.query;

    const filterKey = JSON.stringify({ userId, date, month, year, week });
    const cacheKey = `transactions:${filterKey}`;

    try {
        const cached = await redisClient.get(cacheKey);
        if (cached) return res.status(200).json(JSON.parse(cached));

        const query = { userId };
        const dateFilter = buildDateFilter({ date, month, year, week });
        if (dateFilter) query.date = dateFilter;

        const transactions = await Transaction.find(query);

        if (transactions.length === 0) {
            return res.status(404).json({ error: 'No transactions found' });
        }

        let income = 0, expense = 0;
        const categoryStats = {};

        transactions.forEach(txn => {
            if (txn.type === 'income') income += txn.amount;
            else if (txn.type === 'expense') expense += txn.amount;

            categoryStats[txn.category] = (categoryStats[txn.category] || 0) + txn.amount;
        });

        const response = {
            totalIncome: income,
            totalExpense: expense,
            net: income - expense,
            categoryBreakdown: categoryStats,
            totalTransactions: transactions.length
        };

        await redisClient.setEx(cacheKey, 300, JSON.stringify(response));
        res.status(200).json(response);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    createTransaction,
    getTransactions,
    getTransactionStats,
    updateTransaction,
    deleteTransaction
};
