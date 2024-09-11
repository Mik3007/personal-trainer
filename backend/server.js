import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import biaRoutes from "./routes/biaRoutes.js";
import cors from "cors";
import listEndpoints from 'express-list-endpoints';
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", 
            "https://francescorauccipt.vercel.app"],
    credentials: true,
  })
);
// Rotte pubbliche
app.use("/api/auth", authRoutes);
// Rotte per utenti autenticati
app.use("/api/users", userRoutes);
// Rotte per amministratori
app.use("/api/admin", adminRoutes);
// Rotte per i piani di allenamento
app.use("/api/workout-plans", workoutRoutes);
// Rotte per BIA
app.use("/api/bia", biaRoutes);
// Rotte per la creazione dell'esercizio
app.use("/api/exercises", exerciseRoutes);
const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
  console.table(listEndpoints(app));
});