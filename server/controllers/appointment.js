const db = require('../models/models')
const notificationAdmin = require('./push_notification')
const mongoose = require('mongoose');

const addAppointment = async (req, res) => {
  try {
    const provider = await db.HealthcareProvider.findById(req.params.id);
    const patient = await db.Patient.findById(req.user.id);

    if (!patient) {
      return res.status(404).json({ message: 'Only patients can book an appointment' });
    }

    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    /*const isAuthorized = provider.patients.some(
      (patient) =>
        patient.patientId === req.user.id &&
        patient.status === 'Approved'
    );

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
*/
    const appointment = new db.Appointment({
      patient: req.user.id,
      provider: req.params.id,
      date: req.body.date,
      time: req.body.time,
      reason: req.body.reason,
    });

    const savedAppointment = await appointment.save();

    await db.Patient.updateOne(
      { _id: patient._id },
      { $push: { appointment: savedAppointment._id } }
    );
    await db.HealthcareProvider.updateOne(
      { _id: provider._id },
      { $push: { appointment: savedAppointment._id } }
    );



    await provider.save();
    await patient.save();

    const notification = new db.Notification({
      userId: provider._id,
      message: `You have a new appointment from ${patient.name} at ${savedAppointment.time}${savedAppointment.date}`,
    });
    await notification.save();
    const notificationData = {
      id: notification._id,
      fileId: savedAppointment._id,
      title: `New Appointment added `,
      body: `You have a new appointment from ${patient.name} at ${savedAppointment.time}${savedAppointment.date}`
    };

    await notificationAdmin.sendPushNotification(
      provider._id,
      notificationData
    )



    res.status(200).json({ status: true, _id: savedAppointment._id, patientId: savedAppointment.patient })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while adding the appointment' });
  }
};

const getTodayAppointments = async (req, res) => {
  const userId = req.user.id;
  try {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const appointments = await db.Appointment.find({
      $or: [{ patient: userId }, { provider: userId }],
      date: {
        $gte: startOfDay,
        $lt: endOfDay
      }
    })
      .populate('patient')
      .populate('provider');

    for (let i = 0; i < appointments.length; i++) {
      const appointment = appointments[i];
      if (appointment.date < today && appointment.status === 'Scheduled') {
        appointment.status = 'Completed';
        await appointment.save();
      }
    }

    const patient = await db.User.findById(appointments.patient)
    const provider = await db.User.findById(appointments.provider)

    res.status(200).json({ status: true, data: appointments, provider: provider, patient: patient });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

const updateAppointment = async (req, res) => {
  try {
    const appointment = await db.Appointment.findById(req.params.appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const isAuthorized =
      appointment.patient.toString() === req.user.id ||
      appointment.provider.toString() === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    appointment.date = req.body.date || appointment.date;
    appointment.time = req.body.time || appointment.time;
    appointment.reason = req.body.reason || appointment.reason;

    const updatedAppointment = await appointment.save();
    const provider = await db.HealthcareProvider.findById(appointment.provider);
    const patient = await db.Patient.findById(appointment.patient);

    let recipientId, recipientName, isDoctor;
    if (appointment.patient === req.user.id) {
      recipientId = appointment.provider;
      recipientName = patient.name;
      isDoctor = false;
    } else {
      recipientId = appointment.patient;
      recipientName = provider.name;
      if (provider.type === 'Doctor') {
        isDoctor = true
      } else {
        isDoctor = false
      }
    }
    const notification = new db.Notification({
      userId: recipientId,
      message: `Your appointment with${isDoctor ? ' Dr.' : ''} ${recipientName} has been updated to ${appointment.date} ${appointment.time}`,
    });

    await notification.save();

    const userId = recipientId;
    const notificationData = {
      id: notification._id,
      fileId: updatedAppointment._id,
      title: 'Updated Appointment',
      body: `Your appointment with${isDoctor ? ' Dr.' : ''} ${recipientName} has been updated to ${appointment.date} ${appointment.time}`,
    };

    await notificationAdmin
      .sendPushNotification(userId, notificationData)

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the appointment' });
  }
};
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await db.Appointment.findById(req.params.appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const isAuthorized =
      appointment.patient === req.user.id ||
      appointment.provider === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const provider = await db.HealthcareProvider.findById(appointment.provider);
    const patient = await db.Patient.findById(appointment.patient);

    provider.appointment.pull(appointment._id);
    patient.appointment.pull(appointment._id);

    await provider.save();
    await patient.save();

    let recipientId, recipientName, isDoctor;
    if (appointment.patient === req.user.id) {
      recipientId = appointment.provider;
      recipientName = patient.name;
      isDoctor = false;
    } else {
      recipientId = appointment.patient;
      recipientName = provider.name;
      isDoctor = true;
    }
    const notification = new db.Notification({
      userId: recipientId,
      message: `Your appointment with${isDoctor ? ' Dr.' : ''} ${recipientName} has been deleted`,
    });
    await notification.save();

    const userId = recipientId;
    const notificationData = {
      id: notification._id,
      title: 'Deleted Appointment',
      body: `Your appointment with${isDoctor ? ' Dr.' : ''} ${recipientName} has been deleted`,
    };
    await notificationAdmin.sendPushNotification(userId, notificationData)

    await db.Appointment.deleteOne({ _id: appointment._id })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the appointment' });
  }
};
/*
const getSheduledTimes = async (req, res) => {
  const { date } = req.body;
  const { providerId } = req.params;

  try {
    const appointments = await db.Appointment.find({ date, provider: providerId }, 'time');
    const times = appointments.map(appointment => appointment.time);

    res.status(200).json({ status: true, data: times });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};
*/
const getcompletedAppointment = async (req, res) => {
  const userId = req.user.id;
  try {
    /*const today = new Date();
    let appointment = await db.Appointment.findById(userId)
    for (let i = 0; i < appointment.length; i++) {
      const app = appointment[i];
      if (app.date < today && app.status === 'Scheduled') {
        app.status = 'Completed';
        await app.save();
      }
    }*/
    const appointments = await db.Appointment.find({
      $or: [{ patient: userId }, { provider: userId }],
      status: 'Completed'
    })
    console.log(appointments)
    const patient = await db.User.findById(appointments.patient)
    const provider = await db.User.findById(appointments.provider)

    res.status(200).json({ status: true, data: appointments, provider: provider, patient: patient });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}
const getcancelledAppointment = async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  try {
    /*const today = new Date();
    let appointment = await db.Appointment.findById(userId)
    for (let i = 0; i < appointment.length; i++) {
      const app = appointment[i];
      if (app.date < today && app.status === 'Scheduled') {
        app.status = 'Completed';
        await app.save();
      }
    }*/
    const appointments = await db.Appointment.find({
      $or: [{ patient: userId }, { provider: userId }],
      status: 'Cancelled'
    })
    console.log(appointment)
    const patient = await db.User.findById(appointments.patient)
    const provider = await db.User.findById(appointments.provider)

    res.status(200).json({ status: true, data: appointments, provider: provider, patient: patient });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}
const getsheduledAppointment = async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  try {

    const appointments = await db.Appointment.find({
      $or: [{ patient: userId }, { provider: userId }],
      status: 'Scheduled'
    })
    const patient = await db.User.findById(appointments.patient)
    const provider = await db.User.findById(appointments.provider)

    res.status(200).json({ status: true, data: appointments, provider: provider, patient: patient });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
}
const cancelAppointment = async (req, res) => {
  try {
    console.log(req.params.appointmentId)
    const appointment = await db.Appointment.findByIdAndUpdate(
      { _id: req.params.appointmentId },
      { $set: { status: "Cancelled" } },
      { new: true });
    await appointment.save()
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    const isAuthorized =
      (appointment.patient.toString() === req.user.id ||
        (appointment.provider && appointment.provider.toString() === req.user.id))

console.log(isAuthorized)
    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    const provider = await db.HealthcareProvider.findById(appointment.provider);
    const patient = await db.Patient.findById(appointment.patient);

    let recipientId, recipientName, isDoctor;

    if (appointment.patient.equals(new mongoose.Types.ObjectId(req.user.id))) {
      recipientId = appointment.provider;
      recipientName = patient.name;
      isDoctor = false;
    } else {
      recipientId = appointment.patient;
      recipientName = provider.name;
      if (provider.type === 'Doctor') {
        isDoctor = true
      } else {
        isDoctor = false
      }
    }
    console.log("receipent ", recipientId)

    const notification = new db.Notification({
      userId: recipientId,
      message: `Your appointment with${isDoctor ? ' Dr.' : ''} ${recipientName} has been canceled`,
    });

    await notification.save();

    const userId = recipientId;
    const notificationData = {
      id: notification._id,
      fileId: appointment._id,
      title: 'Updated Appointment',
      body: `Your appointment with${isDoctor ? ' Dr.' : ''} ${recipientName} has been cancelled`,
    };

    await notificationAdmin
      .sendPushNotification(userId, notificationData)


    res.status(200).json({ status: true, message: 'Appointment canceled with success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the appointment' });
  }
}
const appointment = {
  addAppointment,
  //getSheduledTimes,
  getTodayAppointments,
  deleteAppointment,
  updateAppointment,
  getcancelledAppointment,
  getcompletedAppointment,
  getsheduledAppointment,
  cancelAppointment
}

module.exports = appointment