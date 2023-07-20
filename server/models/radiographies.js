const mongoose = require('mongoose')

const RadiographieSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  type: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  result: [
    {
      url: String,
    },
  ],
  sharedwith: [{ type: String, required: false }],
})

const Radiography = mongoose.model('Radiography', RadiographieSchema)

module.exports = Radiography
