import express from 'express';
import User from '../models/User.js';
import adminCheck from '../middleware/adminCheck.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Ottieni il profilo dell'utente corrente
router.get('/profile', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Usa l'ID dell'utente
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero del profilo' });
  }
});

// Aggiorna il profilo dell'utente
router.put('/profile', ensureAuthenticated, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id, // Usa l'ID dell'utente
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Errore nell\'aggiornamento del profilo' });
  }
});

// Ottieni tutti gli utenti (solo per admin)
router.get('/all', ensureAuthenticated, adminCheck, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero degli utenti' });
  }
});

// Promuovi un utente ad admin (solo per admin)
router.put('/promote/:userId', ensureAuthenticated, adminCheck, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { ruolo: 'admin' },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.json({ message: 'Utente promosso ad admin con successo', user });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la promozione dell\'utente' });
  }
});

export default router;
