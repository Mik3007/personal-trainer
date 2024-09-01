import dotenv from 'dotenv';
import express from 'express';
import listEndpoints from 'express-list-endpoints';
import './config/database.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';
import connectDB from './config/database.js';
import cors from 'cors';

dotenv.config();  // Questo deve essere il primo import
connectDB();
console.log('JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173',  // Il dominio del frontend
}));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/workout-plans', workoutRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.table(listEndpoints(app));
});
