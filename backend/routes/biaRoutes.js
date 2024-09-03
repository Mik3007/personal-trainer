import express from 'express';
import BIA from '../models/Bia.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Crea una nuova misurazione BIA
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    console.log('Dati BIA ricevuti dal client:', req.body);
    const { weight, fatPercentage, musclePercentage, waterPercentage, boneMass, bmi } = req.body;
    const bia = new BIA({
      userId: req.user.id,
      weight,
      fatPercentage,
      musclePercentage,
      waterPercentage,
      boneMass,
      bmi
    });
    await bia.save();
    res.status(201).json(bia);
  } catch (error) {
    console.error('Errore nella creazione della misurazione BIA:', error);
    res.status(400).json({ message: 'Errore nella creazione della misurazione BIA' });
  }
});

// Ottieni le misurazioni BIA di un utente
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    console.log("Richiesta misurazioni BIA per l'utente:", req.user.id);
    const biaMeasurements = await BIA.find({ userId: req.user.id }).sort({ date: -1 });
    if (!biaMeasurements || biaMeasurements.length === 0) {
      return res.status(404).json({ message: 'Nessuna misurazione BIA trovata' });
    }
    res.json(biaMeasurements);
  } catch (error) {
    console.error('Errore nel recupero delle misurazioni BIA:', error);
    res.status(500).json({ message: 'Errore nel recupero delle misurazioni BIA' });
  }
});

export default router;