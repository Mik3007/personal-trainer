import express from 'express';
import Workout from '../models/Workout.js';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rotta per creare una nuova scheda (solo admin)
router.post('/', ensureAuthenticated, ensureAdmin, async (req, res) => {
    try {
      console.log('Dati ricevuti dal client:', req.body);
      const { userId, exercises } = req.body;
      
      // Crea una nuova istanza di Workout
      const workout = new Workout({
        userId,
        exercises,
        createdBy: req.user.id  // ID dell'admin che crea la scheda
      });
      
      // Salva la nuova scheda nel database
      await workout.save();
      res.status(201).json(workout);
    } catch (error) {
      console.error('Errore nella creazione della scheda:', error);
      res.status(400).json({ message: 'Errore nella creazione della scheda' });
    }
  });
  
// Rotta per ottenere la scheda più recente di un utente
router.get('/:userId', ensureAuthenticated, async (req, res) => {
  try {
    // Cerca la scheda più recente per l'utente specificato
    const workout = await Workout.findOne({ userId: req.params.userId }).sort({ createdAt: -1 });
    if (!workout) {
      return res.status(404).json({ message: 'Scheda non trovata' });
    }
    res.json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero della scheda' });
  }
});

// Rotta per eliminare una scheda specifica (solo admin)
router.delete('/:workoutId', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const workoutId = req.params.workoutId;
    if (!workoutId) {
      return res.status(400).json({ message: "ID della scheda non fornito" });
    }
    
    // Cerca e elimina la scheda specificata
    const result = await Workout.findByIdAndDelete(workoutId);
    
    if (!result) {
      return res.status(404).json({ message: "Scheda non trovata" });
    }
    
    res.status(200).json({ message: "Scheda eliminata con successo" });
  } catch (error) {
    console.error('Errore durante l\'eliminazione della scheda:', error);
    res.status(500).json({ message: "Errore durante l'eliminazione della scheda", error: error.message });
  }
});

// Rotta per modificare una scheda esistente (solo admin)
router.put('/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { exercises } = req.body;
    
    // Aggiorna la scheda nel database
    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      { exercises, updatedAt: Date.now() },
      { new: true, runValidators: true }  // Restituisce il documento aggiornato e esegue i validatori
    );
    
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Scheda non trovata' });
    }
    
    res.json(updatedWorkout);
  } catch (error) {
    console.error('Errore nella modifica della scheda:', error);
    res.status(400).json({ message: 'Errore nella modifica della scheda' });
  }
});

export default router;
