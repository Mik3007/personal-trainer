import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Lista di email degli amministratori
const adminEmails = [
  'michelealtieri3007@gmail.com',
  'rauccifrancesco229@gmail.com',
];

// Funzione per gestire il login degli utenti
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cerca l'utente nel database tramite l'email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verifica la corrispondenza della password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Controlla se l'utente è un amministratore
    const isAdmin = adminEmails.includes(user.email);

    // Genera un token JWT con le informazioni dell'utente
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d', // Token valido per 30 giorni
      }
    );

    // Invia la risposta al client con i dati dell'utente e il token
    res.json({
      id: user._id,
      email: user.email,
      nome: user.nome,
      cognome: user.cognome,
      isAdmin: isAdmin,
      token: token,
    });
  } catch (error) {
    // Gestione degli errori durante il processo di login
    console.error('Errore durante il login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
