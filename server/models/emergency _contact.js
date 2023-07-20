const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  relationship: { type: String, required: true },

});

const EmergencyContact = mongoose.model('EmergencyContact', emergencyContactSchema);

module.exports = EmergencyContact;
