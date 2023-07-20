const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const appointment = require('../controllers/appointment');


router.post('/healthcareProvider/:id', verifyToken, appointment.addAppointment)
router.put('/:appointmentId', verifyToken, appointment.updateAppointment);
router.get('/:appointmentId/cancelled', verifyToken, appointment.cancelAppointment);
router.delete('/:appointmentId', verifyToken, appointment.deleteAppointment);
router.get('/appointments', verifyToken, appointment.getTodayAppointments)
//router.get('/:providerId', verifyToken, appointment.getSheduledTimes)
router.get('/compluted', verifyToken, appointment.getcompletedAppointment)
router.get('/cancelled', verifyToken, appointment.getcancelledAppointment)
router.get('/sheduled', verifyToken, appointment.getsheduledAppointment)




module.exports = router