const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  type: { type: String },
  yearOfDiscovery: { type: Date },
  followupStatus: { type: String },
  familyHistory: { type: Boolean },
  notes: { type: String },
});

const Allergy = mongoose.model('Allergy', allergySchema);

module.exports = Allergy;
