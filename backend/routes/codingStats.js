import express from 'express';
import { getCodingStats } from '../controllers/codingStats.js';

const router = express.Router();

router.get('/codingStats', getCodingStats);

export default router;