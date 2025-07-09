import express from 'express';
import {createBookmark, deleteBookmark, editBookmark, getAllBookmarks} from '../controllers/bookmark.js';


const router = express.Router();

// create bookmark
router.post('/bookmarks', createBookmark);

// delete bookmark
router.delete('/bookmarks/:id', deleteBookmark);

// edit a bookmark
router.patch('/bookmarks/:id', editBookmark);

// get all bookmarks
router.get('/bookmarks', getAllBookmarks);


export default router;