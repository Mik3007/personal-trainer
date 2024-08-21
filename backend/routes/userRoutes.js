import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Middleware per verificare se l'utente è admin
const isAdmin = async (req, res, next) => {
    try {
      const auth0Id = req.auth.sub; // Ottieni l'ID utente da Auth0
      const user = await User.findOne({ auth0Id });
      if (user && user.role === 'admin') {
        next();
      } else {
        res.status(403).json({ message: 'Accesso negato' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Errore durante la verifica dell\'admin', error: error.message });
    }
  };
  
  // Rotta per creare un nuovo utente (solo per admin)
  router.post('/create', isAdmin, async (req, res) => {
    try {
      const { auth0Id, nome, cognome, dataNascita, sesso, email } = req.body;
      
      const newUser = new User({
        auth0Id,
        nome,
        cognome,
        dataNascita: new Date(dataNascita),
        sesso,
        email
      });
  
      await newUser.save();
      
      res.status(201).json({ message: 'Utente creato con successo', user: newUser });
    } catch (error) {
      res.status(500).json({ message: 'Errore durante la creazione dell\'utente', error: error.message });
    }
  });

// Rotta per ottenere tutti gli utenti (solo per admin)
router.get('/all', isAdmin, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero degli utenti', error: error.message });
  }
});

// Rotta per ottenere un singolo utente per ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il recupero dell\'utente', error: error.message });
  }
});

// Rotta per aggiornare un utente (solo per admin)
router.put('/:userId', isAdmin, async (req, res) => {
  try {
    const { nome, cognome, dataNascita, sesso, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { nome, cognome, dataNascita: new Date(dataNascita), sesso, email },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.status(200).json({ message: 'Utente aggiornato con successo', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'utente', error: error.message });
  }
});

// Rotta per eliminare un utente (solo per admin)
router.delete('/:userId', isAdmin, async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utente non trovato' });
    }
    res.status(200).json({ message: 'Utente eliminato con successo' });
  } catch (error) {
    res.status(500).json({ message: 'Errore durante l\'eliminazione dell\'utente', error: error.message });
  }
});

export default router;