import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rotta per creare un nuovo esercizio (solo per admin autenticati)
router.post('/', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Estrae il nome dell'esercizio e l'ID del gruppo dal body della richiesta
    const { name, groupId } = req.body;
    console.log(`Richiesta di creazione esercizio ricevuta:`, { name, groupId });
    
    // Costruisce il percorso del file JSON per il gruppo di esercizi specificato
    const filePath = path.join(process.cwd(), 'exercises', `${groupId}.json`);
    console.log(`Percorso del file: ${filePath}`);

    // Legge il contenuto del file JSON
    let fileContent;
    try {
      fileContent = await fs.readFile(filePath, 'utf-8');
      console.log('File letto con successo');
    } catch (readError) {
      console.error(`Errore nella lettura del file:`, readError);
      fileContent = '[]'; // Se il file non esiste, inizializziamo con un array vuoto
    }

    let exercises;
    try {
      exercises = JSON.parse(fileContent);
      console.log('File JSON analizzato con successo');
    } catch (parseError) {
      console.error(`Errore nel parsing del JSON:`, parseError);
      exercises = []; // Se il parsing fallisce, inizializziamo con un array vuoto
    }

    // Genera un ID semplice basato sul nome dell'esercizio
    // Sostituisce gli spazi con underscore e converte in minuscolo
    const id = name.toLowerCase().replace(/\s+/g, '_');

    // Crea un nuovo oggetto esercizio
    const newExercise = { id, name };

    // Aggiunge il nuovo esercizio all'array degli esercizi
    exercises.push(newExercise);

    console.log('Contenuto da scrivere:', JSON.stringify(exercises, null, 2));

    // Scrive l'array aggiornato nel file JSON
    try {
      await fs.writeFile(filePath, JSON.stringify(exercises, null, 2));
      console.log('File scritto con successo');
    } catch (writeError) {
      console.error(`Errore nella scrittura del file:`, writeError);
      throw writeError;
    }

    // Invia il nuovo esercizio come risposta
    res.status(201).json(newExercise);
  } catch (error) {
    console.error('Errore durante la creazione dell\'esercizio:', error);
    res.status(500).json({ message: 'Errore durante la creazione dell\'esercizio', error: error.toString() });
  }
});

export default router;