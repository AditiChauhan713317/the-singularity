import mongoose from 'mongoose';
import Note from '../models/notes.js';

// get a single note
const getNote = async (req, res) => {

    const {id } = req.params;
    // mongoose gives an error if the id is not a valid 12 character type id 
    // therefore validate it first
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such note found"});
    } 

    try {
        const note = await Note.findById(id);
        res.status(200).json({note});
    } catch (error) {
        res.status(404).json({error: error.message});
    }

}

// get all notes

const getAllNotes = async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  const skip = (page - 1) * limit;

  const searchQuery = {
    userId,
    $or: [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ],
  };

  try {
    const notes = await Note.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Note.countDocuments(searchQuery);

    res.status(200).json({
      notes,
      page,
      totalPages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


// create a note

const createNote = async (req, res) => {

    const {title, content} = req.body;

     // error check for missing required fields (cause then mongoose will return an error message which is not user friendly so we can return our own )
    
    let missingFields = [];

    if(!content) {
        missingFields.push('content');
    }
    if(missingFields.length > 0) {
       return res.status(400).json({error: 'Fill all required fields', missingFields});
    }
    // hence if any field is missing we dont connect to database and return beforehand
    // returning missingFields array to frontend

    try {
        const userId = req.user._id; // its a protected route
        const note = await Note.create({userId, title, content});
        res.status(200).json({note});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}


// delete a note

const deleteNote = async (req, res) => {

    const {id} = req.params;
    // validate the id
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such note found"});
    }

    try {
        const note = await Note.findByIdAndDelete(id);
        if (!note) { // it might return null if nothing matched (wont get caught in catch block)
            return res.status(404).json({ error: 'No such note found' });
        }
        res.status(200).json({note});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

// edit a note

const editNote = async (req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such note found"});
    }

    try {
        const note = await Note.findByIdAndUpdate(id, {...req.body}, { new: true }); 
        if (!note) {  // it might return null if nothing matched (wont get caught in catch block)
            return res.status(404).json({ error: 'No such note found' });
        }  
        res.status(200).json({note});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

export {getNote, getAllNotes, createNote, deleteNote, editNote};