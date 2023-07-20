const db = require('../models/models')
const notificationAdmin = require('./push_notification')
const mongoose = require('mongoose');

const getSurgery = async (req, res) => {
    try {

        const surgery = await db.Surgery.findById(req.params.id);

        if (!surgery) {
            return res.status(404).json({ message: 'Surgery not found' });
        }


        const patient = await db.Patient.findById(surgery.patient);
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

        res.status(200).json({ status: true, data: surgery });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while fetching the surgery' });
    }
};

const updateSurgery = async (req, res) => {
    try {


        const surgery = await db.Surgery.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    type: req.body.type,
                    descripion: req.body.descripion,
                    date: req.body.date,
                    complications: req.body.complications,
                    sharedwith: req.body.sharedwith
                }
            },
            { new: true }
        );

        if (!surgery) {
            return res.status(404).json({ message: 'Surgery not found' });
        }

        await surgery.save()
        const isAuthorized =
            (surgery.patient.toString() === req.user.id ||
                (surgery.provider && surgery.provider.toString() === req.user.id))

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }



        const patient = await db.Patient.findById(surgery.patient)

        if (surgery.provider !== null && surgery.provider.equals(new mongoose.Types.ObjectId(req.user.id))) {
            const providerUser = await db.User.findById(req.user.id);
            const providerNotification = new db.Notification({
                userId: surgery.patient,
                message: `${surgery.type} updated by ${providerUser.name}`,
            });
            await providerNotification.save();
            const providerNotificationData = {
                id: providerNotification._id,
                fileId: surgery._id,
                title: `${surgery.type} updated`,
                body: `${surgery.type} updated by ${providerUser.name}`,
            };

            await notificationAdmin.sendPushNotification(
                surgery.patient,
                providerNotificationData
            );
        }

        const notifications = await Promise.all(surgery.sharedwith.map(async (name) => {
            const user = await db.User.findOne({ name: name });
            const notification = new db.Notification({
                userId: user._id,
                message: `${surgery.type}: ${surgery._id} of the patient : ${patient.name} updated `,
            });
            await notification.save();
            return notification;
        }));


        notifications.map((notification) => {
            const notificationData = {
                id: notification._id,
                fileId: surgery._id,
                title: `${surgery.type} updated`,
                body: `${surgery.type}: ${surgery._id} of the patient : ${patient.name} updated `,
            };
            return notificationAdmin.sendPushNotification(
                notification.userId,
                notificationData
            );
        });


        res.status(200).json({ message: `${surgery.type}updated successfully`, data: surgery, _id: surgery._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while updating the surgery' });
    }
};

const deleteSurgery = async (req, res) => {
    try {

        const surgery = await db.Surgery.findById(req.params.id);

        if (!surgery) {
            return res.status(404).json({ message: 'Surgery not found' });
        }


        const isAuthorized =
            surgery.patient.toString() === req.user.id ||
            surgery.provider.toString() === req.user.id;

        if (!isAuthorized) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }
        const patient = await db.Patient.findByIdAndUpdate(
            surgery.patient,
            { $pull: { surgeries: { type: surgery._id } } },
            { new: true }
        );
        await patient.save();
        await db.Surgery.deleteOne({ _id: surgery._id })
        res.status(200).json({ message: `${surgery.type} deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred\n while deleting the surgery' });
    }
};

const getSurgeryProvider = async (req, res) => {
    try {
        const surgery = await db.Surgery.findById(req.params.id);

        if (!surgery) {
            return res.status(404).json({ message: 'surgery not found' });
        }
        const provider = await db.User.findById(surgery.provider)
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
        res.status(500).json({ error: 'An error occurred while fetching the surgery' });
    }
}



const surgery = {
    getSurgery,
    updateSurgery,
    deleteSurgery,
    getSurgeryProvider

}

module.exports = surgery