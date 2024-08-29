import User from '../models/User.js';

export const adminCheck = async (req, res, next) => {
  try {
    const auth0Id = req.oidc.user.sub; // Ottieni l'ID utente da Auth0
    const user = await User.findOne({ auth0Id });
    if (user && user.ruolo === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Accesso negato. Solo gli admin possono accedere a questa pagina.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la verifica dell\'admin.', error: error.message });
  }
};
