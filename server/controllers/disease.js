const db = require('../models/models')

const getdiseases = async (req, res) => {
    try {

        const diseases = await db.Diseases.findById(req.params.id);

        if (!diseases) {
            return res.status(404).json({ message: 'diseases not found' });
        }


        const patient = await db.Patient.findById(diseases.patient);
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

        res.status(200).json({ status: true, data: diseases });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while fetching the diseases' });
    }
};

const deletDiseases = async (req, res) => {
    try {

        const diseases = await db.Diseases.findById(req.params.id);

        if (!diseases) {
            return res.status(404).json({ message: 'Diseases not found' });
        }


        const isAuthorized =
            diseases.patient.toString() === req.user.id

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const patient = await db.Patient.findByIdAndUpdate(
            diseases.patient,
            { $pull: { diseases: { type: diseases._id } } },
            { new: true }
        );
        await patient.save();
        await db.Diseases.deleteOne({ _id: diseases._id })


        await db.Diseases.deleteOne({ _id: diseases._id })
        res.status(200).json({ message: `Diseases deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while deleting the Diseases' });
    }
}
const updateDiseases = async (req, res) => {
    try {
console.log(req.params)
console.log(req.body)
        const diseases = await db.Diseases.findById(req.params.id);

        if (!diseases) {
            return res.status(404).json({ message: 'emergency Contact not found' });
        }

        const isAuthorized =
            diseases.patient.toString() === req.user.id
        console.log(isAuthorized)
        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        console.log(req.body)
        const updatedDiseases = await db.Diseases.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { speciality: req.body.speciality, genetic: req.body.genetic, chronicDisease: req.body.chronicDisease, detectedIn: req.body.detectedIn, notes: req.body.notes, curedIn: req.body.curedIn } },
            { new: true }
        );

        console.log(updatedDiseases)

        res.status(200).json({ message: `Diseases updated successfully`, data: updatedDiseases, _id: updateDiseases._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the Diseases' });
    }
}


const diseases = {
    getdiseases,
    updateDiseases,
    deletDiseases

}

module.exports = diseases