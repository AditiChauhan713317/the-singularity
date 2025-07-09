import Widget from '../models/widget.js';
import mongoose from 'mongoose';

// create
const createWidget = async(req, res) => {

    const {type, position, dimensions, config} = req.body;
    // error check for missing required fields (cause then mongoose will return an error message which is not user friendly so we can return our own )
    
    let missingFields = [];

    if(!type) {
        missingFields.push('type');
    }
    if(!position) {
        missingFields.push('position');
    }
    if(!dimensions) {
        missingFields.push('dimensions');
    }
    if(missingFields.length > 0) {
       return res.status(400).json({error: 'Fill all required fields', missingFields});
    }
    // hence if any field is missing we dont connect to database and return beforehand
    // returning missingFields array to frontend


    const userId = req.user._id;

    try {
        const widget = await Widget.create({userId, type, position, dimensions, config});
        res.status(200).json(widget);
    } catch (error) {
        res.status(400).json({error: 'Unable to create widget'});
    }


}

// delete
const deleteWidget = async(req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such widget found"});
    }
    
    try {
        const widget = await Widget.findByIdAndDelete(id);
        if(!widget) {
            res.status(404).json({error: "No such widget found"});
        }
        res.status(200).json(widget);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
}

// edit
const editWidget = async(req, res) => {
    
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No such widget found"});
    }

    try {
        const widget = await Widget.findByIdAndUpdate(id, {...req.body}, {new: true});
        if(!widget) {
            res.status(404).json({error: "No such widget found"});
        }
        res.status(200).json(widget);
    } catch (error) {
        res.status(400).json({error: error.message});
    
    }
}

// get all widgets
const getAllWidgets = async(req, res) => {

    const userId = req.user._id;

    try {
        const widgets = await Widget.find({userId}).sort({createdAt: -1});
        res.status(200).json(widgets);
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}


export {getAllWidgets, createWidget, deleteWidget, editWidget};