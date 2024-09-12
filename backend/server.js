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

// Connessione al database
connectDB();

const app = express();

// Middleware CORS - deve essere posizionato prima delle rotte
app.use(
  cors({
    origin: [
      "http://localhost:5173", 
      "https://francescorauccipt.vercel.app",
      "https://francescorauccipt-kn0650wj6-micheles-projects-d3df038b.vercel.app"
    ],
    credentials: true, // Necessario se utilizzi cookie o autenticazione
  })
);

// Gestione richieste preflight per tutte le rotte (CORS)
app.options('*', cors());

// Middleware per il parsing del body delle richieste
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotte pubbliche
app.use("/api/auth", authRoutes);

// Rotte per utenti autenticati
app.use("/api/users", userRoutes);

// Rotte per amministratori
app.use("/api/admin", adminRoutes);

// Rotte per i piani di allenamento
app.use("/api/workout-plans", workoutRoutes);

// Rotte per la gestione BIA
app.use("/api/bia", biaRoutes);

// Rotte per la creazione degli esercizi
app.use("/api/exercises", exerciseRoutes);

// Gestione degli errori globali
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Errore del server', error: err.message });
});

// Porta del server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server avviato sulla porta ${PORT}`);
  console.table(listEndpoints(app)); // Mostra tutte le rotte
});
