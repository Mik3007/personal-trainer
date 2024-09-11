import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginUser } from '../controllers/authController.js'

const router = express.Router();

// Rotta per la registrazione di un nuovo utente
router.post('/register', async (req, res) => {
  const { email, password, nome, cognome } = req.body;

  try {
    // Verifica se l'utente esiste già
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    // Cripta la password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea un nuovo utente nel database
    const user = await User.create({
      email,
      password: hashedPassword,
      nome,
      cognome
    });

    // Genera un token JWT per l'utente appena registrato
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    // Invia la risposta con i dati dell'utente e il token
    res.status(201).json({
      id: user._id,
      email: user.email,
      nome: user.nome,
      cognome: user.cognome,
      token
    });
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

// Rotta per il login dell'utente
router.post('/login', loginUser);

export default router;
