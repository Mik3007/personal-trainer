import express from 'express';
import User from '../models/User.js';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';

const router = express.Router();

// Rotta per ottenere la lista di tutti gli utenti (solo admin)
router.get('/users', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Recupera tutti gli utenti dal database, escludendo la password
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rotta per ottenere un utente specifico tramite ID (solo admin)
router.get('/users/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Cerca l'utente nel database tramite ID
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Errore nel recupero dell\'utente:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// Rotta per eliminare un utente (solo admin)
router.delete('/users/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Cerca e elimina l'utente dal database
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Errore nell\'eliminazione dell\'utente:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Rotta per promuovere un utente a admin (solo admin)
router.put('/users/:id/admin', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    // Trova l'utente nel database
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Imposta l'utente come admin
    user.isAdmin = true;
    await user.save();
    res.json({ message: 'User promoted to admin' });
  } catch (error) {
    console.error('Errore nella promozione dell\'utente ad admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
