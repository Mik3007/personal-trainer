import User from '../models/User.js';

const adminCheck = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id); // Usa l'ID utente interno
    if (user && user.role === 'admin') { // Assicurati di usare il campo 'role'
      next();
    } else {
      res.status(403).json({ message: 'Accesso negato. Solo gli admin possono accedere a questa risorsa.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore durante la verifica del ruolo admin' });
  }
};

export default adminCheck;
