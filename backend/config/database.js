import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connesso');
  } catch (err) {
    console.error('Errore di connessione MongoDB:', err);
    process.exit(1);
  }
};

export default connectDB;