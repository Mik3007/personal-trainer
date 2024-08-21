import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  auth0Id: { 
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
    type: Date, 
    required: true 
  },
  sesso: { 
    type: String, 
    enum: ['M', 'F', 'Altro'], 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

export default User;