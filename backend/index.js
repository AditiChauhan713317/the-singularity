import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.js';
import githubRoutes from './routes/github.js';
import noteRoutes from './routes/note.js';
import todoRoutes from './routes/todo.js';
import bookmarkRoutes from './routes/bookmark.js';
import quoteRoutes from './routes/quote.js';
import widgetRoutes from './routes/widget.js';
import codingStatsRoutes from './routes/codingStats.js';
import requireAuth from './middleware/requireAuth.js';

// load env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// middleware 
app.use(cors()); // so that our backend deployed on a diff domain accepts req from frontend on another domain
app.use(express.json());

// PUBLIC ROUTES
app.get('/', (req, res) => {
    res.json({message: "Hello"});
})
app.use('/api/user', userRoutes);


// PROTECTED ROUTES
// middleware
app.use(requireAuth);
app.use('/api/github', githubRoutes);
app.use('/api/note', noteRoutes);
app.use('/api/todo', todoRoutes);
app.use('/api/bookmark', bookmarkRoutes);
app.use('/api/quote', quoteRoutes);
app.use('/api/widget', widgetRoutes);
app.use('/api/coding/', codingStatsRoutes);

// set up the connection to db before the server is running
// hence await it
async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
        // listenting to requests only after the db is connected
        app.listen(PORT, () => {
            console.log(`Server is running at port::${PORT}`);
        })
    } catch (error) {
        console.log('Error connecting to mongoDB::::', error);
    }
}

connectDB();