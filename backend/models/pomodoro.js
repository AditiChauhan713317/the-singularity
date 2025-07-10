import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define a session sub-schema
const sessionSchema = new Schema({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number, // in seconds or minutes
    required: true,
  }
}, { _id: false }); // prevent Mongo from adding an _id to each session

const pomodoroSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    date: {
        type: String,
        required: true,
        index: true
    },
    sessions: {
        type: [sessionSchema], // array of sessions
        default: [],
    },
    totalTime: {
        type: Number,
        default: 0
    }
}, {timestamps: true})


const pomodoro = mongoose.model('Pomodoro', pomodoroSchema);
export default pomodoro;