import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import endpoints from 'express-list-endpoints';
import { expressjwt as jwt } from 'express-jwt';
import jwks from 'jwks-rsa';
import workoutPlanRoutes from './routes/workoutPlanRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
    algorithms: ['RS256']
  });
  
  // Applica il middleware jwtCheck a tutte le routes
  app.use(jwtCheck);

// Connessione al database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connesso al database MongoDB Atlas'))
  .catch(err => console.error('Errore di connessione al database:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workout-plans', workoutPlanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
  console.table(endpoints(app));
});