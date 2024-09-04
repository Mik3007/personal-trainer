import express from 'express';
import BIA from '../models/Bia.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Crea una nuova misurazione BIA
router.post('/:userId?', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const { weight, fatPercentage, musclePercentage, waterPercentage, boneMass, bmi } = req.body;
    const bia = new BIA({
      userId,
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
router.get('/:userId?', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const biaMeasurements = await BIA.find({ userId }).sort({ date: -1 });
    if (!biaMeasurements || biaMeasurements.length === 0) {
      return res.status(404).json({ message: 'Nessuna misurazione BIA trovata' });
    }
    res.json(biaMeasurements);
  } catch (error) {
    console.error('Errore nel recupero delle misurazioni BIA:', error);
    res.status(500).json({ message: 'Errore nel recupero delle misurazioni BIA' });
  }
});

router.delete('/:userId?/:biaId', ensureAuthenticated, async (req, res) => {
  try {
    const userId = req.params.userId || req.user.id;
    const { biaId } = req.params;

    if (req.user.id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }

    const deletedBia = await BIA.findOneAndDelete({ _id: biaId, userId });
    if (!deletedBia) {
      return res.status(404).json({ message: 'Misurazione BIA non trovata' });
    }

    res.json({ message: 'Misurazione BIA eliminata con successo' });
  } catch (error) {
    console.error('Errore nell\'eliminazione della misurazione BIA:', error);
    res.status(500).json({ message: 'Errore nell\'eliminazione della misurazione BIA' });
  }
});

export default router;