import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware per verificare l'autenticazione dell'utente
export const ensureAuthenticated = async (req, res, next) => {
  let token;

  // Estrae il token dall'header di autorizzazione
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Verifica la presenza del token
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Decodifica e verifica il token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Recupera i dati dell'utente dal database, escludendo la password
    req.user = await User.findById(decoded.id).select('-password');
    req.user.isAdmin = decoded.isAdmin;
    
    // Controlla se l'utente esiste ancora nel database
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Passa al prossimo middleware
    next();
  } catch (error) {
    console.error('Errore di autenticazione:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

// Middleware per verificare i privilegi di amministratore
export const ensureAdmin = async (req, res, next) => {
  // Verifica se l'utente è autenticato
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Lista di email degli amministratori
  const adminEmails = [
    'michelealtieri3007@gmail.com',
    'altra.email.admin@example.com', 
  ];

  // Controlla se l'email dell'utente è nella lista degli amministratori
  if (adminEmails.includes(req.user.email)) {
    next();
  } else {
    res.status(403).json({ message: 'Accesso negato. Solo gli admin possono accedere.' });
  }
};
