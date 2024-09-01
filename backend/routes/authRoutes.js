import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
    res.status(500).json({ message: 'Errore durante la registrazione' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      });

      res.json({
        _id: user._id,
        email: user.email,
        nome: user.nome,
        cognome: user.cognome,
        token
      });
    } else {
      res.status(401).json({ message: 'Credenziali non valide' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Errore durante il login' });
  }
});

export default router;
