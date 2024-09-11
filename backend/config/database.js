import mongoose from 'mongoose';

// Funzione per connettere il database MongoDB
const connectDB = async () => {
  try {
    // Tenta di stabilire una connessione al database usando l'URI fornito nelle variabili d'ambiente
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connesso');
  } catch (err) {
    // Se si verifica un errore durante la connessione, lo registra e termina il processo
    console.error('Errore di connessione MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;
