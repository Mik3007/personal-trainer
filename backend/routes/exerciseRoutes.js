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
    
    // Costruisce il percorso del file JSON per il gruppo di esercizi specificato
    const filePath = path.join(process.cwd(), 'exercises', `${groupId}.json`);

    // Legge il contenuto del file JSON
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const exercises = JSON.parse(fileContent);

    // Genera un ID semplice basato sul nome dell'esercizio
    // Sostituisce gli spazi con underscore e converte in minuscolo
    const id = name.toLowerCase().replace(/\s+/g, '_');

    // Crea un nuovo oggetto esercizio
    const newExercise = { id, name };

    // Aggiunge il nuovo esercizio all'array degli esercizi
    exercises.push(newExercise);

    // Scrive l'array aggiornato nel file JSON
    // Il terzo argomento (2) in JSON.stringify aggiunge indentazione per leggibilità
    await fs.writeFile(filePath, JSON.stringify(exercises, null, 2));

    // Invia il nuovo esercizio come risposta
    res.status(201).json(newExercise);
  } catch (error) {
    console.error('Errore durante la creazione dell\'esercizio:', error);
    res.status(500).json({ message: 'Errore durante la creazione dell\'esercizio' });
  }
});

export default router;
