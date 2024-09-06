import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginUser } from '../controllers/authController.js'

const router = express.Router();

// Registrazione
router.post('/register', async (req, res) => {
  const { email, password, nome, cognome } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    // Cripta la password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      nome,
      cognome
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      _id: user._id,
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

// Login
router.post('/login', loginUser);

export default router;