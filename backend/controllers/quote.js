import Quote from '../models/quote.js';
import cloudinary from '../utils/cloudinary.js';


// create quote
const createQuote = async (req, res) => {
  const userId = req.user._id;
  const { text } = req.body;
  const image = req.file;

  if (!text && !image) {
    return res.status(400).json({ error: 'Either text or image is required' });
  }

  try {
    const quote = await Quote.create({
      userId,
      text: text || null,
      imageUrl: image ? image.path : null, // Cloudinary gives URL in image.path
      imagePublicId: image ? image.filename : null  // need it to delete the image when quote is deleted
    });

    res.status(201).json(quote);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to save quote' });
  }
};

// delete quote
const deleteQuote = async(req, res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such quote found"});
    } 

    try {
        const quote = await Quote.findByIdAndDelete(id);
        if (!quote) { 
            return res.status(404).json({ error: 'No such quote found' });
        }
        
        // delete from Cloudinary if image exists (the quote could be just text)
        if (quote.imagePublicId) {
            await cloudinary.uploader.destroy(quote.imagePublicId);
        }

        res.status(200).json({quote});
    } catch (error) {
        res.status(400).json({error: error.message});
    }

}

// edit quote
const editQuote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such quote found" });
  }

  const { text, removeImage } = req.body; 
  const newImage = req.file;

  if (!text && !newImage) {
    return res.status(400).json({ error: 'Either text or image is required' });
  }

  try {
    const oldQuote = await Quote.findById(id);
    if (!oldQuote) {
      return res.status(404).json({ error: 'No such quote found' });
    }

    // delete old image from Cloudinary if either new image is uploaded or no new image
    // so the frontend will send a new image if user wanted to replace it
    // or in case user did not want any image it will send a flag "removeImage": true
    if ((newImage || removeImage) && oldQuote.imagePublicId) {
      await cloudinary.uploader.destroy(oldQuote.imagePublicId);
    }

    //prepare update fields
    const updateFields = {
      text: text || null,
    };

    if (newImage) { // upload if only a new image is provided
        updateFields.imageUrl = newImage.path;
        updateFields.imagePublicId = newImage.filename;
    }
    else if (removeImage === 'true' || removeImage === true) {
        updateFields.imageUrl = null;
        updateFields.imagePublicId = null;
    }

    const updatedQuote = await Quote.findByIdAndUpdate(id, updateFields, { new: true });

    res.status(200).json(updatedQuote);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to update quote' });
  }
};


// get all quotes
const getAllQuotes = async (req, res) => {

    const userId = req.user._id;

    try {
        const quotes = await Quote.find({userId}).sort({ createdAt: -1 });
        res.status(200).json(quotes);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }

}

export {createQuote, deleteQuote, editQuote, getAllQuotes};