const db = require('../models/models');
const notificationAdmin = require('./push_notification')
const mongoose = require('mongoose');


const getRadiographie = async (req, res) => {
  try {
    console.log(req.params)
    const radiographie = await db.Radiographies.findById(req.params.id);

    if (!radiographie) {
      return res.status(404).json({ message: 'Radiographie not found' });
    }

    const patient = await db.Patient.findById(radiographie.patient);
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

    res.status(200).json({ status: true, data: radiographie });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the radiographie' });
  }
};

const updateRadiographie = async (req, res) => {
  try {
    const radiographie = await db.Radiographies.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { type: req.body.type, descripion: req.body.descripion, date: req.body.date, reason: req.body.reason, sharedwith: req.body.sharedwith } },
      { new: true }
    );
    if (!radiographie) {
      return res.status(404).json({ message: 'Radiographie not found' });
    }
    await radiographie.save();

    const isAuthorized =
      radiographie.patient.toString() === req.user.id ||
      radiographie.provider.toString() === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }



    const updatedRadiographie = await radiographie.save();

    const patient = await db.Patient.findById(updatedRadiographie.patient)


    if (radiographie.provider !== null && radiographie.provider.equals(new mongoose.Types.ObjectId(req.user.id))) {
      const providerUser = await db.User.findById(req.user.id);
      const providerNotification = new db.Notification({
        userId: updatedRadiographie.patient,
        message: `${updatedRadiographie.type} updated by ${providerUser.name}`,
      });
      await providerNotification.save();
      const providerNotificationData = {
        id: providerNotification._id,
        fileId: updatedRadiographie._id,
        title: `${updatedRadiographie.type} updated`,
        body: `${updatedRadiographie.type} updated by ${providerUser.name}`,
      };

      await notificationAdmin.sendPushNotification(
        updatedRadiographie.patient,
        providerNotificationData
      );
    }

    const notifications = await Promise.all(updatedRadiographie.sharedwith.map(async (name) => {
      const user = await db.User.findOne({ name: name });
      const notification = new db.Notification({
        userId: user._id,
        message: `${updatedRadiographie.type}: ${updatedRadiographie._id} of the patient : ${patient.name} updated `,
      });
      await notification.save();
      return notification;
    }));


    notifications.map((notification) => {
      const notificationData = {
        id: notification._id,
        fileId: updatedRadiographie._id,
        title: `${updatedRadiographie.type} updated`,
        body: `${updatedRadiographie.type}: ${updatedRadiographie._id} of the patient : ${patient.name} updated `,
      };
      return notificationAdmin.sendPushNotification(
        notification.userId,
        notificationData
      );
    });


    console.log(updatedRadiographie)

    res.status(200).json({ message: `${updatedRadiographie.type} updated successfully`, data: updatedRadiographie, _id: radiographie._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the radiographie' });
  }
};

const deleteRadiographie = async (req, res) => {
  try {
    const radiographie = await db.Radiographies.findById(req.params.id);

    if (!radiographie) {
      return res.status(404).json({ message: 'Radiographie not found' });
    }

    const isAuthorized =
      radiographie.patient.toString() === req.user.id ||
      radiographie.provider.toString() === req.user.id;

    if (!isAuthorized) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const patient = await db.Patient.findByIdAndUpdate(
      radiographie.patient,
      { $pull: { radiographies: { type: radiographie._id } } },
      { new: true }
    );
    await patient.save();

    await db.Radiographies.deleteOne({ _id: radiographie._id })
    res.status(200).json({ message: `${radiographie.type} deleted successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the radiographie' });
  }
};

const getRadioProviderName = async (req, res) => {
  try {
    const radiographie = await db.Radiographies.findById(req.params.id);

    if (!radiographie) {
      return res.status(404).json({ message: 'radiographie not found' });
    }
    const provider = await db.User.findById(radiographie.provider)
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
    res.status(500).json({ error: 'An error occurred while fetching the radiographie' });
  }
}

const radiographie = {
  getRadiographie,
  updateRadiographie,
  deleteRadiographie,
  getRadioProviderName
};

module.exports = radiographie;
