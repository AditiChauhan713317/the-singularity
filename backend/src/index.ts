import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

const allowedOrigins = [
  'https://the-singularity-starship-to-mars.vercel.app/',
  'http://localhost:5173' // dev
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send(`Server running on ${PORT}`);
})


app.listen(PORT, () => {
    console.log(`server is running on port:::${PORT}`);
})
