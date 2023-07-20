const db = require('../models/models')


const getEmergencyContact = async (req, res) => {
    try {

        const emergencyContact = await db.EmergencyContact.findById(req.params.id);

        if (!emergencyContact) {
            return res.status(404).json({ status: false, message: 'Emergency contact not found' });
        }


        const patient = await db.Patient.findById(emergencyContact.patient);
        const isAuthorized =
            patient._id.toString() === req.user.id ||
            patient.healthcareproviders.some(
                provider =>
                    provider.healthcareproviderId.toString() === req.user.id &&
                    provider.status === 'Approved' &&
                    provider.type === 'Doctor'
            );

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        res.status(200).json({ status: true, data: emergencyContact });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while fetching the emergencyContact' });
    }
};
const deletEmergencyContact = async (req, res) => {
    try {

        const emergencyContact = await db.EmergencyContact.findById(req.params.id);

        if (!emergencyContact) {
            return res.status(404).json({ message: 'emergencyContact not found' });
        }


        const isAuthorized =
            emergencyContact.patient.toString() === req.user.id

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const patient = await db.Patient.findById(emergencyContact.patient);
        patient.emergencyContacts.pull(emergencyContact._id);
        await patient.save();

        await db.EmergencyContact.deleteOne({ _id: emergencyContact._id })
        res.status(200).json({ message: `${emergencyContact.type} deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while deleting the emergencyContact' });
    }
}
const updateEmergencyContact = async (req, res) => {
    try {
        const emergencyContact = await db.EmergencyContact.findById(req.params.id);

        if (!emergencyContact) {
            return res.status(404).json({ message: 'emergency Contact not found' });
        }

        const isAuthorized =
            emergencyContact.patient.toString() === req.user.id

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const emergencyContactUpdates = {};
        const emergencyContactFields = ['name', 'phoneNumber', 'relationship'];

        emergencyContactFields.forEach((field) => {
            if (req.body[field]) {
                emergencyContactUpdates[field] = req.body[field];
            }
        });

        Object.assign(emergencyContact, emergencyContactUpdates);

        const updatedemergencyContact = await emergencyContact.save();

        res.status(200).json({ message: `${updatedemergencyContact.type} updated successfully`, data: updatedemergencyContact, _id: updateemergencyContact._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the emergencyContact' });
    }
}

const emergencyContatct = {
    getEmergencyContact,
    deletEmergencyContact,
    updateEmergencyContact
}
module.exports = emergencyContatct