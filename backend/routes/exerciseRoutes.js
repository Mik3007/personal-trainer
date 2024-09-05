import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';

const router = express.Router();

// Crea un nuovo esercizio
router.post('/', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { name, groupId } = req.body;
    
    const filePath = path.join(process.cwd(), 'exercises', `${groupId}.json`);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const exercises = JSON.parse(fileContent);

    // Genera un ID semplice basato sul nome dell'esercizio
    const id = name.toLowerCase().replace(/\s+/g, '_');

    const newExercise = { id, name };

    exercises.push(newExercise);

    await fs.writeFile(filePath, JSON.stringify(exercises, null, 2));

    res.status(201).json(newExercise);
  } catch (error) {
    console.error('Errore durante la creazione dell\'esercizio:', error);
    res.status(500).json({ message: 'Errore durante la creazione dell\'esercizio' });
  }
});

export default router;