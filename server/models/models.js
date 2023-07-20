const { User, HealthcareProvider, Patient, Admin } = require("./user")

module.exports = {
    User,
    HealthcareProvider,
    Patient,
    Admin,
    Appointment: require('./appointment'),
    Conversation: require('./conversation'),
    EmergencyContact: require('./emergency _contact'),
    HealthMetric: require('./healthcareMetric'),
    Message: require('./message'),
    Prescription: require('./prescription'),
    Notification: require('./notififcation'),
    Allergy: require('./allergy'),
    Diseases: require('./diseases'),
    Radiographies: require('./radiographies'),
    Speciality: require('./speciality'),
    Surgery: require('./surgery'),
    Labresult: require('./labresult'),
    Metric: require('./healthmetricname')
}