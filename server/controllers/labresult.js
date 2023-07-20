const db = require('../models/models')
const notificationAdmin = require('./push_notification')
const mongoose = require('mongoose');

const updateLabresult = async (req, res) => {
    try {
        const labresult = await db.Labresult.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { test: req.body.test, result: req.body.result, date: req.body.date, reason: req.body.reason, sharedwith: req.body.sharedwith } },
            { new: true }
        );

        if (!labresult) {
            return res.status(404).json({ message: 'labresult not found' });
        }
        await labresult.save()
        const isAuthorized =
            (labresult.patient.toString() === req.user.id ||
                (labresult.provider && labresult.provider.toString() === req.user.id))

        console.log(isAuthorized)
        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }


        const patient = await db.Patient.findById(labresult.patient);

        if (labresult.provider !== null && labresult.provider.equals(new mongoose.Types.ObjectId(req.user.id))) {
            const providerUser = await db.User.findById(req.user.id);
            const providerNotification = new db.Notification({
                userId: labresult.patient,
                message: `Your lab result (${labresult.test}) has been updated by ${providerUser.name}`,
            });
            await providerNotification.save();
            const providerNotificationData = {
                id: providerNotification._id,
                fileId: labresult._id,
                title: 'Updated Lab Result',
                body: `Your lab result (${labresult.test}) has been updated by ${providerUser.name}`,
            };

            await notificationAdmin.sendPushNotification(
                labresult.patient,
                providerNotificationData
            );
        }

        const notifications = await Promise.all(labresult.sharedwith.map(async (name) => {
            const user = await db.User.findOne({ name: name });
            const notification = new db.Notification({
                userId: user._id,
                message: `The lab result (${labresult.test}) of the patient (${patient.name}) has been updated`,
            });
            await notification.save();
            return notification;
        }));


        notifications.map((notification) => {
            const notificationData = {
                id: notification._id,
                fileId: labresult._id,
                title: 'Updated Lab Result',
                body: `The lab result (${labresult.test}) of the patient (${patient.name}) has been updated`,
            };
            return notificationAdmin.sendPushNotification(
                notification.userId,
                notificationData
            );
        });



        res.status(200).json({ message: 'Lab result updated successfully', _id: labresult._id });

    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: 'An error occurred while updating the lab result' });
    }
};

const deleteLabresult = async (req, res) => {
    try {
        console.log(req.params)
        const labresult = await db.Labresult.findById(req.params.id);

        if (!labresult) {
            return res.status(404).json({ message: 'labresult not found' });
        }

        const isAuthorized =
            labresult.patient.toString() === req.user.id ||
            labresult.provider.toString() === req.user.id;

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const patient = await db.Patient.findByIdAndUpdate(
            labresult.patient,
            { $pull: { labresult: { type: labresult._id } } },
            { new: true }
        );
        await patient.save();
        await db.Labresult.deleteOne({ _id: labresult._id })
        res.status(200).json({ message: `Labresult deleted successfully` });
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: 'An error occurred while deleting the lab result' });
    }
};

const getlabresultById = async (req, res) => {
    try {
        const labresult = await db.Labresult.findById(req.params.id);

        if (!labresult) {
            return res.status(404).json({ message: 'labresult not found' });
        }

        const patient = await db.Patient.findById(labresult.patient);
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

        res.status(200).json({ status: true, data: labresult });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the labresult' });
    }
};

const getLabProviderName = async (req, res) => {
    try {
        const labresult = await db.Labresult.findById(req.params.id);

        if (!labresult) {
            return res.status(404).json({ message: 'labresult not found' });
        }
        const provider = await db.User.findById(labresult.provider)
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
        res.status(500).json({ error: 'An error occurred while fetching the labresult' });
    }
}
const labresult = {
    updateLabresult,
    deleteLabresult,
    getlabresultById,
    getLabProviderName
}

module.exports = labresult