import express from 'express';
import User from '../models/User.js';
import { ensureAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// Rotta per ottenere il profilo dell'utente autenticato
router.get('/profile', ensureAuthenticated, async (req, res) => {
  try {
    // Cerca l'utente nel database usando l'ID dell'utente autenticato
    // Esclude la password dai dati restituiti
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Invia i dati dell'utente come risposta
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rotta per aggiornare i dati dell'utente autenticato
router.put('/profile', ensureAuthenticated, async (req, res) => {
  // Estrae i dati da aggiornare dal body della richiesta
  const { nome, cognome, email } = req.body;
  
  try {
    // Cerca l'utente nel database usando l'ID dell'utente autenticato
    const user = await User.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Aggiorna i campi dell'utente se sono presenti nella richiesta
    // Altrimenti, mantiene i valori esistenti
    user.nome = nome || user.nome;
    user.cognome = cognome || user.cognome;
    user.email = email || user.email;
    
    // Salva l'utente aggiornato nel database
    const updatedUser = await user.save();
    
    // Invia i dati aggiornati dell'utente come risposta
    res.json({
      id: updatedUser._id,
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
