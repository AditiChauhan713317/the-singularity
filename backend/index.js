import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// load env variables
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// middleware 
app.use(cors()); // so that our backend deployed on a diff domain accepts req from frontend on another domain
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Hello"});
})

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