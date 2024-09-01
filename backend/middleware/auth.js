import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const ensureAuthenticated = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token ricevuto:', token);
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificato:', decoded);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      console.log('Utente non trovato');
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    console.error('Errore di autenticazione:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};

export const ensureAdmin = async (req, res, next) => {
  console.log('Verifica admin per utente:', req.user);
  
  if (!req.user) {
    console.log('Utente non autenticato');
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const adminEmails = [
    'michelealtieri3007@gmail.com',
  ];

  if (adminEmails.includes(req.user.email)) {
    console.log('Accesso consentito per utente admin');
    next();
  } else {
    console.log('Accesso negato. Solo gli admin possono accedere.');
    res.status(403).json({ message: 'Accesso negato. Solo gli admin possono accedere.' });
  }
};




