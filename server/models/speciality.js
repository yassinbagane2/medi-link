const mongoose = require('mongoose');

const specialitySchema = new mongoose.Schema({
    nom : {
        type : String ,
        required : true
    },
    date:{type:Date,default: Date.now}
})

const Speciality = mongoose.model('Speciality', specialitySchema);

module.exports = Speciality;
