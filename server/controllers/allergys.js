const db = require('../models/models')
const mongoose = require('mongoose');

const getAllergy = async (req, res) => {
    try {

        const allergy = await db.Allergy.findById(req.params.id);

        if (!allergy) {
            return res.status(404).json({ message: 'allergy not found' });
        }


        const patient = await db.Patient.findById(allergy.patient);
        const isAuthorized =
            patient._id.toString() === req.user.id ||
            patient.healthcareproviders.some(
                provider =>
                    provider.healthcareproviderId.toString() === req.user.id &&
                    provider.status === 'Approved'
            );

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.status(200).json({ status: true, data: allergy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while fetching the allergy' });
    }
};
const deletAllergy = async (req, res) => {
    try {

        const allergy = await db.Allergy.findById(req.params.id);

        if (!allergy) {
            return res.status(404).json({ message: 'Allergy not found' });
        }


        const isAuthorized = allergy.patient.equals(new mongoose.Types.ObjectId(req.user.id));
        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const patient = await db.Patient.findByIdAndUpdate(
            allergy.patient,
            { $pull: { allergys: { type: allergy._id } } },
            { new: true }
        );
        await patient.save();
        await db.Allergy.deleteOne({ _id: allergy._id })
        res.status(200).json({ message: `Allergy deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while deleting the Allergy' });
    }
}
const updateAllergy = async (req, res) => {
    try {
        const allergy = await db.Allergy.findById(req.params.id);

        if (!allergy) {
            return res.status(404).json({ message: 'emergency Contact not found' });
        }
        console.log(allergy)
        console.log(allergy.patient)
        console.log(req.user.id)
        const isAuthorized = allergy.patient.equals(new mongoose.Types.ObjectId(req.user.id));
        console.log(isAuthorized)
        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        console.log(isAuthorized)
        const updatedAllergy = await db.Allergy.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { familyHistory: req.body.familyHistory, followupStatus: req.body.followupStatus, type: req.body.type, yearOfDiscovery: req.body.yearOfDiscovery, notes: req.body.notes } },
            { new: true }
        );
        console.log(updatedAllergy)

        res.status(200).json({ message: `Allergy updated successfully`, data: updatedAllergy, _id: updateAllergy._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the Allergy' });
    }
}

const allergy = {
    getAllergy,
    updateAllergy,
    deletAllergy
}

module.exports = allergy