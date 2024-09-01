import express from 'express';
import Workout from '../models/Workout.js';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';

const router = express.Router();

// Crea una nuova scheda (solo admin)
router.post('/', ensureAuthenticated, ensureAdmin, async (req, res) => {
    try {
      console.log('Dati ricevuti dal client:', req.body);
      const { userId, exercises } = req.body;
      const workout = new Workout({
        userId,
        exercises,
        createdBy: req.user.id
      });
      await workout.save();
      res.status(201).json(workout);
    } catch (error) {
      console.error('Errore nella creazione della scheda:', error);
      res.status(400).json({ message: 'Errore nella creazione della scheda' });
    }
  });
  

// Ottieni la scheda di un utente
router.get('/:userId', ensureAuthenticated, async (req, res) => {
  try {
    const workout = await Workout.findOne({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (!workout) {
      return res.status(404).json({ message: 'Scheda non trovata' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero della scheda' });
  }
});

export default router;