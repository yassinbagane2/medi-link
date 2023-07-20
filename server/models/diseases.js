const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  speciality: { type: String, required: false },
  genetic: { type: Boolean, default: false },
  chronicDisease: { type: Boolean, default: false },
  detectedIn: { type: Date },
  curedIn: { type: Date},
  notes: { type: String },
});

const Disease = mongoose.model('Disease', DiseaseSchema);

module.exports = Disease;
