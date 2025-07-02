import express from 'express';

const router = express.Router();

import { getNote, getAllNotes, createNote, deleteNote, editNote } from '../controllers/note.js';

// get all notes
router.get('/notes', getAllNotes);

// get a note
router.get('/notes/:id', getNote);

// create note
router.post('/notes', createNote);

// delete a note
router.delete('/notes/:id', deleteNote);

// edit a note
router.patch('/notes/:id', editNote);


export default router;

