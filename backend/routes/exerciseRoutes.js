import express from "express";
import fs from "fs/promises";
import path from "path";
import { ensureAuthenticated, ensureAdmin } from "../middleware/auth.js";

const router = express.Router();

// Rotta per creare un nuovo esercizio (solo per admin autenticati)
router.post("/", ensureAuthenticated, ensureAdmin, async (req, res) => {
  console.log('Richiesta di creazione esercizio ricevuta:', req.body);
  try {
    // Estrae il nome dell'esercizio e l'ID del gruppo dal body della richiesta
    const { name, groupId } = req.body;

    console.log(`Creazione nuovo esercizio: ${name} per il gruppo ${groupId}`);

    // Costruisce il percorso del file JSON per il gruppo di esercizi specificato
    const filePath = path.join(process.cwd(), "exercises", `${groupId}.json`);
    console.log(`Percorso del file: ${filePath}`);

    // Legge il contenuto del file JSON
    let fileContent;
    try {
      fileContent = await fs.readFile(filePath, "utf-8");
      console.log("File letto con successo");
    } catch (readError) {
      console.error(`Errore nella lettura del file: ${readError}`);
      return res
        .status(500)
        .json({ message: "Errore nella lettura del file degli esercizi" });
    }

    let exercises;
    try {
      exercises = JSON.parse(fileContent);
      console.log("File JSON analizzato con successo");
    } catch (parseError) {
      console.error(`Errore nel parsing del JSON: ${parseError}`);
      return res
        .status(500)
        .json({ message: "Errore nel parsing del file degli esercizi" });
    }

    const id = name.toLowerCase().replace(/\s+/g, "_");
    const newExercise = { id, name };
    exercises.push(newExercise);

    try {
      await fs.writeFile(filePath, JSON.stringify(exercises, null, 2));
      console.log("File scritto con successo");
    } catch (writeError) {
      console.error(`Errore nella scrittura del file: ${writeError}`);
      return res
        .status(500)
        .json({ message: "Errore nella scrittura del file degli esercizi" });
    }

    res.status(201).json(newExercise);
  } catch (error) {
    console.error("Errore durante la creazione dell'esercizio:", error);
    res
      .status(500)
      .json({
        message: "Errore durante la creazione dell'esercizio",
        error: error.toString(),
      });
  }
});

router.get('/check/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params;
    const filePath = path.join(process.cwd(), 'backend', 'exercises', `${groupId}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

export default router;
