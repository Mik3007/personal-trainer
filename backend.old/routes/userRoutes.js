import express from 'express';
import User from '../models/User.js';
import checkJwt from '../middlewares/checkJwt.js'; // Importa il middleware checkJwt

const router = express.Router();

const logToken = (req, res, next) => {
    console.log('Token JWT ricevuto:', req.headers.authorization);
    next();
};

// Middleware per verificare se l'utente è admin
const adminCheck = (req, res, next) => {
    const roles = req.user['http://your-app/roles'] || [];
    if (roles.includes('admin')) {
        next();
    } else {
        res.status(403).json({ message: 'Accesso negato. Solo gli admin possono accedere a questa pagina.' });
    }
};

// Rotta per recuperare i dati di un utente autenticato
router.get('/users/all', checkJwt, (req, res, next) => {
    console.log('Token JWT ricevuto:', req.headers.authorization);
    console.log('Utente autenticato:', req.user);
    next();
}, async (req, res) => {
    try {
        const users = await User.find({}, '-auth0Id');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});




// Rotta per aggiornare i dati di un utente autenticato
router.put('/profile', checkJwt, async (req, res) => {
    try {
        const auth0Id = req.user.sub; // Ottieni l'ID utente dal token JWT

        // Trova l'utente nel database e aggiorna i dati
        const updatedUser = await User.findOneAndUpdate(
            { auth0Id }, // Cerca l'utente tramite l'ID di Auth0
            { ...req.body }, // Aggiorna con i nuovi dati forniti nel corpo della richiesta
            { new: true, runValidators: true } // Restituisce il nuovo documento aggiornato
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utente non trovato' });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Errore nell\'aggiornamento del profilo', error: error.message });
    }
});

// Rotta per ottenere tutti gli utenti (solo admin)
router.get('/all', checkJwt, async (req, res) => {
    try {
      const users = await User.find({}, '-auth0Id');
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  });

// Rotta per aggiornare un utente (solo admin)
router.put('/admin/users/:id', checkJwt, adminCheck, async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Utente non trovato.' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'utente.', error: error.message });
    }
});

// Rotta per eliminare un utente (solo admin)
router.delete('/admin/users/:id', checkJwt, adminCheck, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Utente non trovato.' });
        }
        res.json({ message: 'Utente eliminato con successo.' });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'eliminazione dell\'utente.', error: error.message });
    }
});

export default router;
