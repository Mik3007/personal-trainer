import express from "express";
import WorkoutPlan from "../models/WorkoutPlan.js";
import User from "../models/User.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Configurazione per ottenere il percorso del file corrente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Middleware per verificare se l'utente è un personal trainer (admin)
const isPersonalTrainer = async (req, res, next) => {
  try {
    const auth0Id = req.auth.sub;
    const user = await User.findOne({ auth0Id });
    if (user && user.role === "admin") {
      next();
    } else {
      res.status(403).json({ message: "Accesso negato" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Errore durante la verifica del ruolo",
      error: error.message,
    });
  }
};

// Crea una nuova scheda d'allenamento (solo per personal trainer)
router.post("/", isPersonalTrainer, async (req, res) => {
  try {
    const { userId, nome, descrizione, dataInizio, dataFine, esercizi } =
      req.body;
    const newWorkoutPlan = new WorkoutPlan({
      userId,
      nome,
      descrizione,
      dataInizio,
      dataFine,
      esercizi,
    });
    await newWorkoutPlan.save();
    res.status(201).json({
      message: "Scheda d'allenamento creata con successo",
      workoutPlan: newWorkoutPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Errore durante la creazione della scheda d'allenamento",
      error: error.message,
    });
  }
});

// Ottieni tutte le schede d'allenamento di un utente
router.get("/user/:userId", async (req, res) => {
  try {
    const workoutPlans = await WorkoutPlan.find({ userId: req.params.userId });
    res.status(200).json(workoutPlans);
  } catch (error) {
    res.status(500).json({
      message: "Errore durante il recupero delle schede d'allenamento",
      error: error.message,
    });
  }
});

// Ottieni una singola scheda d'allenamento
router.get("/:id", async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id);
    if (!workoutPlan) {
      return res
        .status(404)
        .json({ message: "Scheda d'allenamento non trovata" });
    }
    res.status(200).json(workoutPlan);
  } catch (error) {
    res.status(500).json({
      message: "Errore durante il recupero della scheda d'allenamento",
      error: error.message,
    });
  }
});

// Aggiorna una scheda d'allenamento (solo per personal trainer)
router.put("/:id", isPersonalTrainer, async (req, res) => {
  try {
    const { nome, descrizione, dataInizio, dataFine, esercizi } = req.body;
    const updatedWorkoutPlan = await WorkoutPlan.findByIdAndUpdate(
      req.params.id,
      { nome, descrizione, dataInizio, dataFine, esercizi },
      { new: true }
    );
    if (!updatedWorkoutPlan) {
      return res
        .status(404)
        .json({ message: "Scheda d'allenamento non trovata" });
    }
    res.status(200).json({
      message: "Scheda d'allenamento aggiornata con successo",
      workoutPlan: updatedWorkoutPlan,
    });
  } catch (error) {
    res.status(500).json({
      message: "Errore durante l'aggiornamento della scheda d'allenamento",
      error: error.message,
    });
  }
});

// Elimina una scheda d'allenamento (solo per personal trainer)
router.delete("/:id", isPersonalTrainer, async (req, res) => {
  try {
    const deletedWorkoutPlan = await WorkoutPlan.findByIdAndDelete(
      req.params.id
    );
    if (!deletedWorkoutPlan) {
      return res
        .status(404)
        .json({ message: "Scheda d'allenamento non trovata" });
    }
    res
      .status(200)
      .json({ message: "Scheda d'allenamento eliminata con successo" });
  } catch (error) {
    res.status(500).json({
      message: "Errore durante l'eliminazione della scheda d'allenamento",
      error: error.message,
    });
  }
});

// Aggiorna il peso di un esercizio in una scheda d'allenamento
router.patch("/:planId/exercise/:exerciseId/peso", async (req, res) => {
  try {
    const { planId, exerciseId } = req.params;
    const { peso } = req.body;

    const workoutPlan = await WorkoutPlan.findById(planId);
    if (!workoutPlan) {
      return res.status(404).json({ message: "Scheda non trovata" });
    }

    const exercise = workoutPlan.esercizi.id(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Esercizio non trovato" });
    }

    exercise.pesoUtente = peso;

    await workoutPlan.save();

    res.status(200).json({
      message: "Peso aggiornato con successo",
      updatedExercise: exercise,
    });
  } catch (error) {
    res.status(500).json({
      message: "Errore durante l'aggiornamento del peso",
      error: error.message,
    });
  }
});

// Ottieni tutti gli esercizi dal file JSON
router.get("/exercises", async (req, res) => {
  try {
    const exercisesFile = await fs.readFile(
      path.join(__dirname, "../data/exercises.json"),
      "utf-8"
    );
    const exercises = JSON.parse(exercisesFile);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({
      message: "Errore durante il recupero degli esercizi",
      error: error.message,
    });
  }
});

export default router;
