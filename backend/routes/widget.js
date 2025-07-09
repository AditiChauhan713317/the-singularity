import express from 'express';
import { getAllWidgets, createWidget, deleteWidget, editWidget } from '../controllers/widget.js';

const router = express.Router();

router.get('/widgets', getAllWidgets);

router.post('/widgets', createWidget);

router.delete('/widgets/:id', deleteWidget);

router.patch('/widgets/:id', editWidget);

export default router;
