const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const patient = require('../controllers/patient');

router.get('/healthcare-providers', verifyToken, patient.getHealthcareProviders);
router.get('/:id/prescriptions', verifyToken, patient.getPrescriptionsCurrent);
router.post('/:patientId/prescriptions', verifyToken, patient.addPrescription);
router.get('/:patientId/symptom-checks', verifyToken, patient.getSymptomChecks);
router.post('/symptom-checks', verifyToken, patient.addSymptomCheck);
router.get('/:id/surgeries', verifyToken, patient.getSurgeries);
router.post('/:id/surgeries', verifyToken, patient.addSurgery);
router.get('/:id/radiographies', verifyToken, patient.getRadiographies);
router.post('/:id/radiographies', verifyToken, patient.addRadiographie);
router.get('/:id/health-journals', verifyToken, patient.getHealthJournals);
router.post('/health-journals', verifyToken, patient.addHealthJournalEntry);
router.get('/:id/emergency-contacts', verifyToken, patient.getEmergencyContacts);
router.post('/emergency-contacts', verifyToken, patient.addEmergencyContact);
router.get('/:id/allergies', verifyToken, patient.getPatientAllergies);
router.post('/allergies', verifyToken, patient.addAllergy);
router.get('/:id/labresult', verifyToken, patient.getlabresult);
router.post('/:id/labresult', verifyToken, patient.addLabresult);
router.get('/:patientId/diseases', verifyToken, patient.getPatientDiseases);
router.post('/diseases', verifyToken, patient.addPatientDisease);
router.get('/provider/:name',verifyToken,patient.getProviderIdFromName)
router.post('/:patientId',verifyToken,patient.searchProviders)

module.exports = router;
