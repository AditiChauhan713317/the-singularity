import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const todoSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true, // indexing the userId field for better querying
    },
    text: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
    },
    completed: {
        type: Boolean,
        default: false,
    },


}, {timestamps: true})

const todo = mongoose.model('Todo', todoSchema);
export default todo;