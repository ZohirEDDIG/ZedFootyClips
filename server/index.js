import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import clipRoutes from './routes/clip.route.js';
import emailRoutes from './routes/email.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clips', clipRoutes);
app.use('/api/gmail', emailRoutes);

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});