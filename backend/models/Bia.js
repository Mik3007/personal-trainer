import mongoose from 'mongoose';

const biaSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number, required: true },
  fatPercentage: { type: Number, required: true },
  musclePercentage: { type: Number, required: true },
  waterPercentage: { type: Number, required: true },
  boneMass: { type: Number, required: true },
  bmi: { type: Number, required: true },
});

const BIA = mongoose.model('BIA', biaSchema);

export default BIA;