import express from 'express';

const router = express.Router();

import {toggleTodo, getAllTodo, createTodo, deleteTodo, editTodo} from '../controllers/todo.js';


// toggle todo
router.patch('/todos/toggle/:id', toggleTodo); // there are two patch req so they need diff paths

// get all todos
router.get('/todos', getAllTodo);

// create a todo
router.post('/todos', createTodo);

// delete a todo
router.delete('/todos/:id', deleteTodo);

// edit a todo
router.patch('/todos/:id', editTodo);


export default router;


