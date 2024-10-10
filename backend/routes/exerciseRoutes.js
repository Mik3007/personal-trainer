import express from "express";
import fs from "fs/promises";
import path from "path";
import { ensureAuthenticated, ensureAdmin } from "../middleware/auth.js";

const router = express.Router();

// Rotta per creare un nuovo esercizio (solo per admin autenticati)
router.post('/', async (req, res) => {
  try {
    const { name, groupId } = req.body;
    console.log(`Creazione nuovo esercizio: ${name} per il gruppo ${groupId}`);

    const filePath = path.join(process.cwd(), 'backend', 'exercises', `${groupId}.json`);
    console.log(`Percorso del file: ${filePath}`);

    let exercises = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      console.log('Contenuto del file letto:', fileContent);
      exercises = JSON.parse(fileContent);
      console.log('File JSON analizzato con successo. Esercizi esistenti:', exercises);
    } catch (error) {
      console.error('Errore nella lettura o parsing del file:', error);
      // Se il file non esiste, continuiamo con un array vuoto
    }

    const id = name.toLowerCase().replace(/\s+/g, '_');
    const newExercise = { id, name };
    console.log('Nuovo esercizio da aggiungere:', newExercise);

    exercises.push(newExercise);
    console.log('Array di esercizi aggiornato:', exercises);

    try {
      await fs.writeFile(filePath, JSON.stringify(exercises, null, 2));
      console.log('File scritto con successo');

      // Verifica il contenuto del file dopo la scrittura
      const updatedContent = await fs.readFile(filePath, 'utf-8');
      console.log('Contenuto aggiornato del file:', updatedContent);
    } catch (writeError) {
      console.error('Errore nella scrittura del file:', writeError);
      throw writeError;
    }

    res.status(201).json(newExercise);
  } catch (error) {
    console.error('Errore durante la creazione dell\'esercizio:', error);
    res.status(500).json({ message: 'Errore durante la creazione dell\'esercizio', error: error.toString() });
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
