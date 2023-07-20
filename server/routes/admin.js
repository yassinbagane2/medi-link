const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const admin = require('../controllers/admin');

router.delete('/users/:id', verifyToken, admin.deleteusers);
router.get('/users', verifyToken, admin.getUsers);
router.put('/healthcare-providers/:providerId', verifyToken, admin.approveHealthcareProvider);
router.get('/healthcare-providers/pending', verifyToken, admin.getPendingHealthcareProviders);
router.post('/feedbacks/:feedbackId', verifyToken, admin.sendfeedbackresponse);
router.get('/feedbacks', verifyToken, admin.getfeedbacks);

module.exports = router;
