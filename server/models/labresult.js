const mongoose = require('mongoose');

const labresultSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  test: { type: String, required: false },
  result: { type: String, required: false },
  date: { type: Date, required: false },
  reason: { type: String, required: false },
  files: [{
    url: String
  }],
  sharedwith: [{ type: String, required: false },]
});

const Labresult = mongoose.model('Labresult', labresultSchema);

module.exports = Labresult;
