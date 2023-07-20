const db = require('../models/models');

const addUserMetric = async (req, res) => {
    try {
        const { metricName, value } = req.body;
        const patient = req.user.id;

        const healthMetric = new db.HealthMetric({ patient, metricName, value });
        await healthMetric.save();


        await db.Patient.updateOne(
            { _id: req.user.id },
            { $push: { healthcareMetrics: healthMetric._id } }
        );

        res.status(201).json({ message: 'Health metric added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add health metric' });
    }
};

const getUserMetric = async (req, res) => {
    try {
        const patient = req.params.patientId;
        const metricName = req.params.metricName;

        const healthMetrics = await db.HealthMetric.find({ patient, metricName })
            .sort({ date: 1 });
        res.json({ status: true, data: healthMetrics });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get health metrics' });
    }
};

const getAllUserMetrics = async (req, res) => {
    try {
        const patient = req.params.patientId
        const healthMetrics = await db.HealthMetric.find(patient);

        res.json({ status: true, data: healthMetrics });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get user metrics' });
    }
}
const healthcareMetrics = {
    getUserMetric,
    addUserMetric,
    getAllUserMetrics
}

module.exports = healthcareMetrics