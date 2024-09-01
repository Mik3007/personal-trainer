import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nome: {
    type: String,
    required: true
  },
  cognome: {
    type: String,
    required: true
  },
  dataNascita: {
    type: Date
  },
  sesso: {
    type: String,
    enum: ['M', 'F', 'Altro']
  },
  ruolo: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// Metodo per confrontare le password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);
