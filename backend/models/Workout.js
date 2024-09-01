import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
    groupId: { type: String, required: true },
    exerciseId: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true }
  });
  
  const WorkoutSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [ExerciseSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  export default mongoose.model('Workout', WorkoutSchema);
  