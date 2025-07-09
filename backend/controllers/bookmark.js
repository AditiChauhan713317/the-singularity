import Bookmark from '../models/bookmark.js';
import mongoose from 'mongoose';
import metascraper from 'metascraper';
import metascraperTitle from 'metascraper-title';
import metascraperLogo from 'metascraper-logo';
import metascraperUrl from 'metascraper-url';
import got from 'got';

const scraper = metascraper([
  metascraperTitle(),
  metascraperLogo(), // gets favicon/logo
  metascraperUrl()
]);

// create bookmark
const createBookmark = async (req, res) => {
  const { url, customName } = req.body;
  const userId = req.user._id;

  try {
    const { body: html, url: finalUrl } = await got(url); 
    const metadata = await scraper({ html, url: finalUrl });

    const bookmark = await Bookmark.create({
      userId,
      url: finalUrl,
      title: metadata.title,
      favicon: metadata.logo || `${new URL(finalUrl).origin}/favicon.ico`,
      customName,
    });

    res.status(201).json(bookmark);
  } catch (err) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch metadata or save bookmark' });
  }
};


// delete a bookmark

const deleteBookmark = async(req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such bookmark found"});
    }

    try {
        const bookmark = await Bookmark.findByIdAndDelete(id);
        if(!bookmark) {
            return res.status(404).json({error: 'No bookmark found'});
        }
        res.status(200).json(bookmark);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to delete the bookmark' });
    }

}

// edit bookmark

const editBookmark = async(req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such bookmark found"});
    }

    

    try {
        const {url, customName} = req.body;
        // const userId = req.user._id;

        const { body: html, url: finalUrl } = await got(url); 
        const metadata = await scraper({ html, url: finalUrl });

        const bookmark = await Bookmark.findByIdAndUpdate(id, {
            url: finalUrl,
            title: metadata.title,
            favicon: metadata.logo || `${new URL(finalUrl).origin}/favicon.ico`,
            customName: customName
            // no need to provide userId cause its not channging
        }, { new: true });

        if(!bookmark) {
            return res.status(404).json({error: 'No such bookmark found'});
        }
        
        res.status(200).json(bookmark);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to edit the bookmark' });
    }

}

// get a bookmark --> do i need it??

// get all bookmarks 
const getAllBookmarks = async(req, res) => {

    const userId = req.user._id;

    try {
        const bookmarks = await Bookmark.find({userId}).sort({ createdAt: -1 });
        res.status(200).json(bookmarks);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch all the bookmarks' });
    }

}


export {createBookmark, deleteBookmark, editBookmark, getAllBookmarks};