import express from 'express';
import User from '../models/User.js';
import { ensureAuthenticated, ensureAdmin } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();
// Rotta per ottenere la lista di tutti gli utenti (solo admin)
router.get('/users', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Errore nel recupero degli utenti:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/users/:id', ensureAuthenticated, ensureAdmin, async (req, res) => {
  try {
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
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.isAdmin = true;
    await user.save();
    res.json({ message: 'User promoted to admin' });
  } catch (error) {
    console.error('Errore nella promozione dell\'utente ad admin:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Rotta per la registrazione di un utente da parte dell'admin
router.post('/users/register', ensureAuthenticated, ensureAdmin, async (req, res) => {
  const { email, password, nome, cognome, dataNascita, sesso, role } = req.body;

  try {
    // Verifica se l'utente esiste già
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    // Crea un nuovo utente
    user = new User({
      email,
      nome,
      cognome,
      dataNascita,
      sesso,
      role,
      isAdmin: role === 'admin'
    });

    // Cripta la password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Salva l'utente nel database
    await user.save();

    res.status(201).json({
      message: 'Utente registrato con successo',
      user: {
        id: user.id,
        email: user.email,
        nome: user.nome,
        cognome: user.cognome,
        role: user.role,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Errore durante la registrazione dell\'utente:', error);
    res.status(500).json({ message: 'Errore del server durante la registrazione' });
  }
});

export default router;