const mongoose = require('mongoose');

const healthMetricSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  metricName: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const HealthMetric = mongoose.model('HealthMetric', healthMetricSchema);

module.exports = HealthMetric;
