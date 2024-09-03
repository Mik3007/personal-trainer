import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { loginUser } from '../controllers/authController.js'

const router = express.Router();

// Registrazione
router.post('/register', async (req, res) => {
  const { email, password, nome, cognome } = req.body;
  console.log('Dati ricevuti dal client:', req.body);

  try {
    const userExists = await User.findOne({ email });
    console.log('Verifica se l\'utente esiste già:', userExists);

    if (userExists) {
      return res.status(400).json({ message: 'Utente già registrato' });
    }

    // Cripta la password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Password criptata:', hashedPassword);

    const user = await User.create({
      email,
      password: hashedPassword,
      nome,
      cognome
    });
    console.log('Utente creato:', user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });
    console.log('Token generato:', token);

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
router.post('/login', loginUser), async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
      });
      console.log('Generazione risposta login:', { token, isAdmin: user.isAdmin });
      const isAdmin = ['michelealtieri3007@gmail.com'].includes(user.email);

      console.log('Utente autenticato:', {
        id: user._id,
        email: user.email,
        isAdmin: isAdmin
      });

      res.json({
        _id: user._id,
        email: user.email,
        nome: user.nome,
        cognome: user.cognome,
        email: req.body.email,
        dataNascita: req.body.dataNascita,
        isAdmin: isAdmin,
        token
      });
    } else {
      res.status(401).json({ message: 'Credenziali non valide' });
    }
  } catch (error) {
    console.error('Errore durante il login:', error);
    res.status(500).json({ message: 'Errore durante il login' });
  }
};

export default router;
