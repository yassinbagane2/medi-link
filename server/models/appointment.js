const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: false },
  time: { type: String, required: false },
  reason: { type: String, required: false },
  status: { type: String, default: "Scheduled", enum: ["Scheduled", "Cancelled", "Completed"] },
  payed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

AppointmentSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
