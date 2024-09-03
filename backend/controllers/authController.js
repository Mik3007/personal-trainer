import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

// Lista di email degli amministratori
const adminEmails = [
  'michelealtieri3007@gmail.com',
  'altra.email.admin@example.com', // Aggiungi altre email qui
];

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Trova l'utente in base all'email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Confronta la password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Determina se l'utente è un admin
    const isAdmin = adminEmails.includes(user.email);

    // Crea il token JWT includendo l'informazione `isAdmin`
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

    // Risposta al frontend con il token e altre informazioni utili
    res.json({
      _id: user._id,
      email: user.email,
      nome: user.nome,
      cognome: user.cognome,
      isAdmin: isAdmin,
      token: token,
    });
  } catch (error) {
    console.error('Errore durante il login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
