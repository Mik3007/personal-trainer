import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const ensureAuthenticated = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    req.user.isAdmin = decoded.isAdmin;

    if (!req.user) {
      return res.status(401).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    console.error('Errore di autenticazione:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
export const ensureAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  // Lista di email degli amministratori
  const adminEmails = [
    'michelealtieri3007@gmail.com',
    'rauccifrancesco229@gmail.com', 
  ];
  if (adminEmails.includes(req.user.email)) {
    next();
  } else {
    res.status(403).json({ message: 'Accesso negato. Solo gli admin possono accedere.' });
  }
};
