import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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

export default mongoose.model('User', UserSchema);