import express from 'express';
import  {createQuote, deleteQuote, editQuote, getAllQuotes} from '../controllers/quote.js';
import { quoteUpload } from '../middleware/quoteUpload.js';


const router = express.Router();

// get all quotes
router.get('/quotes', getAllQuotes);

// create quote
router.post('/qutoes', quoteUpload.single('quote'),  createQuote);

// delete quote
router.delete('/quotes/:id', deleteQuote);

// edit quote
router.patch('/quotes/:id', editQuote);

export default router;