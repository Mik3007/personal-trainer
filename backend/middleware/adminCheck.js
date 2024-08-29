import User from '../models/User.js';

const adminCheck = async (req, res, next) => {
  try {
    const user = await User.findOne({ auth0Id: req.auth.sub });
    if (user && user.ruolo === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Accesso negato. Solo gli admin possono accedere a questa risorsa.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la verifica del ruolo admin' });
  }
};

export default adminCheck;