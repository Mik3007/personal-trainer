import express from 'express';
import User from '../models/User.js';
import checkJwt from '../middleware/auth.js';
import adminCheck from '../middleware/adminCheck.js';

const router = express.Router();

// Ottieni il profilo dell'utente corrente
router.get('/profile', checkJwt, async (req, res) => {
  try {
    const user = await User.findOne({ auth0Id: req.auth.sub });
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero del profilo' });
  }
});

// Aggiorna il profilo dell'utente
router.put('/profile', checkJwt, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { auth0Id: req.auth.sub },
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
router.get('/all', checkJwt, adminCheck, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel recupero degli utenti' });
  }
});

// Promuovi un utente ad admin (solo per admin)
router.put('/promote/:userId', checkJwt, adminCheck, async (req, res) => {
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