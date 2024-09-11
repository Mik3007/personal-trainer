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
import listEndpoints from "express-list-endpoints";

// Configura le variabili d'ambiente
dotenv.config();

// Connette al database
connectDB();

// Inizializza l'applicazione Express
const app = express();

// Middleware per il parsing del body delle richieste
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurazione CORS per consentire richieste da origini specifiche
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://francescorauccipt.vercel.app",
    ],
    credentials: true,
  })
);

// Definizione delle rotte dell'applicazione

// Rotte pubbliche per l'autenticazione
app.use("/api/auth", authRoutes);

// Rotte per utenti autenticati
app.use("/api/users", userRoutes);

// Rotte per amministratori
app.use("/api/admin", adminRoutes);

// Rotte per i piani di allenamento
app.use("/api/workout-plans", workoutRoutes);

// Rotte per la gestione delle misurazioni BIA
app.use("/api/bia", biaRoutes);

// Rotte per la gestione degli esercizi
app.use("/api/exercises", exerciseRoutes);

// Definizione della porta su cui il server ascolterà
const PORT = process.env.PORT || 5000;

// Avvio del server
app.listen(PORT, () => {
  // Stampa in console tutte le rotte definite nell'applicazione
  console.table(listEndpoints(app));
});
