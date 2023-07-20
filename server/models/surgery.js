const mongoose = require('mongoose');

const surgerySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthcareProvider',
    required: false,
  },
  type:{
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  complications: {
    type: String,
  },
  files:[{
    url: String, 
  }],
  sharedwith : [{type: String, required: false }]
});

const Surgerie = mongoose.model('Surgerie', surgerySchema);

module.exports = Surgerie;
