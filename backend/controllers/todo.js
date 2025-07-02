import mongoose from 'mongoose';
import Todo from '../models/todo.js';

// toggle todo
const toggleTodo = async (req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such todo found"});
    }

    try {
        const currTodo = await Todo.findById(id);
        if (!currTodo) {  // it might return null if nothing matched (wont get caught in catch block)
            return res.status(404).json({ error: 'No such todo found' });
        }  

        // toggle
        currTodo.completed = !currTodo.completed;

        const updatedTodo = await currTodo.save();

        res.status(200).json({todo: updatedTodo});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }

}


// get all todos
const getAllTodo = async (req, res) => {

    const userId = req.user._id;

    try {
        const todos = await Todo.find({userId}).sort({ createdAt: -1 });
        res.status(200).json({todos});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }

}

// create a todo

const createTodo = async (req, res) => {

    const {text} = req.body;

    let missingFields = [];

    if(!text || text.trim() === '') {
        missingFields.push('text');
    }
    if(missingFields.length > 0) {
        return res.status(400).json({error: 'Fill all required fields', missingFields});
    }


    try {
        const userId = req.user._id;
        const todo = await Todo.create({userId, text});
        res.status(200).json({todo});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }


}

// delete a todo
const deleteTodo = async (req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such todo found"});
    }


    try {
        const todo = await Todo.findByIdAndDelete(id);
        if(!todo) {
            res.status(404).json({error: 'No such todo found'});
        }
        res.status(200).json({todo});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }

}


// edit a todo
const editTodo = async (req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such todo found"});
    }

    try {
        const todo = await Todo.findByIdAndUpdate(id, {...req.body}, { new: true }); 
        if (!todo) {  // it might return null if nothing matched (wont get caught in catch block)
            return res.status(404).json({ error: 'No such todo found' });
        }  
        res.status(200).json({todo});
    } catch (error) {
        res.status(400).json({ error: error.message});
    }

}

export {toggleTodo, getAllTodo, createTodo, deleteTodo, editTodo};