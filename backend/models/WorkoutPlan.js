import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  serie: { type: Number, required: true },
  ripetizioni: { type: Number, required: true },
  videoUrl: { type: String },
  note: { type: String },
  giorno: { type: String, required: true },
  pesoUtente: { type: Number }
}, { strict: false });

const WorkoutPlanSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  nome: { type: String, required: true },
  descrizione: { type: String },
  dataInizio: { type: Date, required: true },
  dataFine: { type: Date },
  esercizi: [ExerciseSchema]
}, { timestamps: true });

const WorkoutPlan = mongoose.model('WorkoutPlan', WorkoutPlanSchema);

export default WorkoutPlan;