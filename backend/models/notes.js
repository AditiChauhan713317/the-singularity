import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, // indexing the userId field for better querying
        
    },
    title: {
        type: String,
        maxlength: 100,
    }, 
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 5000,
    },


}, {timestamps: true})

const note = mongoose.model('Note', noteSchema);
export default note;