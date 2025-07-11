import express from 'express';
import {
  getTransactions,
  getTransactionStats,
  createTransaction,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transaction.js';

const router = express.Router();

// Get all transactions
router.get('/', getTransactions);

// Get all transaction stats
router.get('/stats', getTransactionStats);

// Create a new transaction
router.post('/', createTransaction);

// Update a transaction
router.patch('/:id', updateTransaction);

// Delete a transaction
router.delete('/:id', deleteTransaction);

export default router;
