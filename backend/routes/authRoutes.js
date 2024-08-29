import express from 'express';
import User from '../models/User.js';
import { getUserDetails } from '../services/auth0Service.js';
import checkJwt from '../middleware/auth.js';

const router = express.Router();

// Rotta per la sincronizzazione dell'utente dopo il login
router.post('/sync', checkJwt, async (req, res) => {
  try {
    const auth0Id = req.auth.sub;
    const auth0UserDetails = await getUserDetails(auth0Id);

    let user = await User.findOne({ auth0Id });
    if (!user) {
      // Crea un nuovo utente se non esiste
      user = new User({
        auth0Id,
        email: auth0UserDetails.email,
        nome: auth0UserDetails.given_name || '',
        cognome: auth0UserDetails.family_name || '',
      });
    } else {
      // Aggiorna i dettagli dell'utente esistente
      user.email = auth0UserDetails.email;
      user.nome = auth0UserDetails.given_name || user.nome;
      user.cognome = auth0UserDetails.family_name || user.cognome;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Errore durante la sincronizzazione dell\'utente:', error);
    res.status(500).json({ message: 'Errore del server durante la sincronizzazione' });
  }
});

export default router;