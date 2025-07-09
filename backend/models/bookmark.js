import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookmarkSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
     url: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }, 
    title: {
        type: String,
    },
    favicon: {
        type: String,
    },
    customName: {
        type: String
    }

}, { timestamps: true })

const bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default bookmark;