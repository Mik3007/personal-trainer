import express from 'express';
import WorkoutPlan from '../models/WorkoutPlan.js';
import User from '../models/User.js';
import checkJwt from '../middleware/auth.js';
import adminCheck from '../middleware/adminCheck.js';

const router = express.Router();

// Crea un nuovo piano di allenamento
router.post('/', checkJwt, async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.auth.sub });
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    const workoutPlan = new WorkoutPlan({
      ...req.body,
      userId: user._id
    });
    await workoutPlan.save();
    res.status(201).json(workoutPlan);
  } catch (error) {
    res.status(400).json({ message: 'Errore nella creazione del piano di allenamento' });
  }
});

// Ottieni tutti i piani di allenamento dell'utente
router.get('/', checkJwt, async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.auth.sub });
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    const workoutPlans = await WorkoutPlan.find({ userId: user._id });
    res.json(workoutPlans);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero dei piani di allenamento' });
  }
});

// Ottieni un piano di allenamento specifico
router.get('/:id', checkJwt, async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findById(req.params.id);
    if (!workoutPlan) {
      return res.status(404).json({ message: 'Piano di allenamento non trovato' });
    }
    res.json(workoutPlan);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero del piano di allenamento' });
  }
});

// Aggiorna un piano di allenamento
router.put('/:id', checkJwt, async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!workoutPlan) {
      return res.status(404).json({ message: 'Piano di allenamento non trovato' });
    }
    res.json(workoutPlan);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiornamento del piano di allenamento' });
  }
});

// Elimina un piano di allenamento
router.delete('/:id', checkJwt, async (req, res) => {
  try {
    const workoutPlan = await WorkoutPlan.findByIdAndDelete(req.params.id);
    if (!workoutPlan) {
      return res.status(404).json({ message: 'Piano di allenamento non trovato' });
    }
    res.json({ message: 'Piano di allenamento eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'eliminazione del piano di allenamento' });
  }
});

export default router;