const db = require('../models/models');
const notificationAdmin = require('./push_notification')
const mongoose = require('mongoose');


const getPrescription = async (req, res) => {
  try {
    const prescription = await db.Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    const patient = await db.Patient.findById(prescription.patient);
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

    res.status(200).json({ status: true, data: prescription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the prescription' });
  }
};

const updatePrescription = async (req, res) => {
  try {

    const prescription = await db.Prescription.findOneAndUpdate(
      req.params.id,
      {
        $set: { médicament: req.body.médicament, dosage: req.body.dosage, fréquence: req.body.fréquence, dateDébut: req.body.dateDébut, dateFin: req.body.dateFin }
      });
    await prescription.save()

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    const isAuthorized =
      (prescription.patient.toString() === req.user.id ||
        (prescription.provider && prescription.provider.equals(new mongoose.Types.ObjectId(req.user.id))))

    console.log(isAuthorized)
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    if (prescription.provider !== null && prescription.provider.equals(new mongoose.Types.ObjectId(req.user.id))) {
      const providerUser = await db.User.findById(req.user.id);
      const providerNotification = new db.Notification({
        userId: prescription.patient,
        message: ` ${prescription.médicament} updated by ${providerUser.name}`,
      });
      await providerNotification.save();
      const providerNotificationData = {
        id: providerNotification._id,
        fileId: prescription._id,
        title: `${prescription.médicament} updated `,
        body: ` ${prescription.médicament} updated by ${providerUser.name}`,
      };

      await notificationAdmin.sendPushNotification(
        prescription.patient,
        providerNotificationData
      );
    }

    res.status(200).json({ message: 'Prescription updated successfully', data: prescription, _id: prescription._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the prescription' });
  }
};

const deletePrescription = async (req, res) => {
  try {
    const prescription = await db.Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: 'Prescription not found' });
    }

    const isAuthorized =
      prescription.patient.toString() === req.user.id ||
      prescription.provider.toString() === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const patient = await db.Patient.findByIdAndUpdate(
      prescription.patient,
      { $pull: { ordonnances: { type: prescription._id } } },
      { new: true }
    );
    await patient.save();

    await db.Prescription.deleteOne({ _id: prescription._id })
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the prescription' });
  }
};

const getRadioProviderName = async (req, res) => {
  try {
    const prescription = await db.Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: 'prescription not found' });
    }
    const provider = await db.User.findById(prescription.provider)
    if (!provider) {
      return;
    }
    res.status(200).json({
      status: true,
      data: {
        provider: provider.name
      }
    });
  } catch (e) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the prescription' });
  }
}

const getCurentPrescriptions = async (req, res) => {
  const userId = req.user.id;
  try {
    const patient = await db.Patient.findById(userId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    const currentDate = new Date();
    const prescriptions = await db.Prescription.find({ patient: patient._id, dateFin: { $lte: currentDate } });
    res.status(200).json({ status: true, data: prescriptions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching medical records' });
  }
};

const prescription = {
  getPrescription,
  updatePrescription,
  deletePrescription,
  getRadioProviderName,
  getCurentPrescriptions
};

module.exports = prescription;