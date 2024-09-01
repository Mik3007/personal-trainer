import express from 'express';
import User from '../models/User.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Rotta per ottenere il profilo dell'utente autenticato
router.get('/profile', ensureAuthenticated, async (req, res) => {
  console.log('Richiesta profilo ricevuta per utente ID:', req.user.id);
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rotta per aggiornare i dati dell'utente autenticato
router.put('/profile', ensureAuthenticated, async (req, res) => {
  console.log('Richiesta di aggiornamento profilo per utente ID:', req.user.id);
  const { nome, cognome, email } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.nome = nome || user.nome;
    user.cognome = cognome || user.cognome;
    user.email = email || user.email;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      nome: updatedUser.nome,
      cognome: updatedUser.cognome,
      email: updatedUser.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
