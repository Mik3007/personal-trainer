import dotenv from 'dotenv';
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/database.js';
import cors from 'cors';

dotenv.config();  // Questo deve essere il primo import
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',  // Il dominio del frontend
}));

app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.table(listEndpoints(app));
});
