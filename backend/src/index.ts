import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
// routes
import authRoutes from './routes/authRoutes';


dotenv.config();

const PORT = process.env.PORT;

const app = express();

const allowedOrigins = [
  'https://the-singularity-starship-to-mars.vercel.app/',
  'http://localhost:5173' // dev
];

// middleware
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

// connect the routes
app.use('/api/user', authRoutes);


// connect DB before starting the server

const dbServer  = async () => {

  try {
    const mongo_uri = process.env.MONGODB_URI;
    // to satisfy TS
    if(!mongo_uri) {
      throw Error("Missing API_KEY in environment variables");
    }
    await mongoose.connect(mongo_uri);
    console.log("connected to MongoDB");

    // start server
    app.listen(PORT, () => {
      console.log(`server is running at PORT::${PORT}`);
    })
  } catch (error) { 
    console.log(error);
  }

}

// start it
dbServer();