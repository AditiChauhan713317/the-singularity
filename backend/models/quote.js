import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  text: {
    type: String,
    default: null
  },
  imageUrl: {
    type: String,
    default: null
  },
  imagePublicId: { // Required for deletion
    type: String, 
    default: null 
  }, 
}, {timestamps: true});


const quote = mongoose.model('Quote', quoteSchema);
export default quote;