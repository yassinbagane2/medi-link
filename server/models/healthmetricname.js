const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
    nom : {
        type : String ,
        required : true
    },
    date:{type:Date,default: Date.now}
})

const Metric = mongoose.model('Metric', metricSchema);

module.exports = Metric;
