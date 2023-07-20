const db = require('../models/models');
const notificationAdmin = require('./push_notification')

const deleteusers = async (req, res) => {
    const { id } = req.params
    try {
        const user = await db.User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.role !== 'Patient' && user.role !== 'HealthcareProvider') {
            return res.status(400).json({ success: false, message: 'Invalid user role' });
        }
        await db.User.deleteOne({ _id: user._id });

        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'An error occurred while deleting the user', error: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await db.User.find({ role: { $in: ['Patient', 'HealthcareProvider'] } });
        res.json({ data: users, status: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const approveHealthcareProvider = async (req, res) => {
    try {
        const healthcareProvider = await db.HealthcareProvider.findById(req.params.providerId);

        if (!healthcareProvider) {
            return res.status(404).json({ message: 'Healthcare provider not found' });
        }

        if (req.userRole !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        healthcareProvider.status = req.body.status;

        const updatedProvider = await healthcareProvider.save();
        const notification = new db.Notification({
            userId: updatedProvider._id,
            message: `Your request has been aprroved log into your account`,
        });
        await notification.save();
        const notificationData = {
            id: notification._id,
            fileId: updatedProvider._id,
            title: 'Sign up approved',
            body: `Your request has been aprroved log into your account`,
        };
        await notificationAdmin.sendPushNotification(
            updatedProvider._id,
            notificationData
        );

        res.status(200).json({ message: "Approved" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while approving/rejecting the healthcare provider' });
    }
};

const getPendingHealthcareProviders = async (req, res) => {
    try {
        if (req.userRole !== 'Admin') {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        const pendingProviders = await db.HealthcareProvider.find({ status: 'Pending' });
        res.json({ status: true, data: pendingProviders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while retrieving pending healthcare providers' });
    }
};

const sendfeedbackresponse = async (req, res) => {
    try {
        const { feedbackId } = req.params;
        const response = req.body.response;

        const feedback = await db.FeedBack.findById(feedbackId);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        const feedbackResponse = new db.FeedbackResponse({
            feedback: feedbackId,
            response: response,
        });

        await feedbackResponse.save();

        feedback.response = feedbackResponse._id;
        await feedback.save();

        res.status(201).json({ message: 'Feedback response sent successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getfeedbacks = async (req, res) => {
    try {
        const feedbacks = await db.FeedBack.find().populate('user');

        const response = {
            message: 'Feedbacks retrieved successfully',
            data: feedbacks,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const admin = {
    deleteusers,
    getUsers,
    approveHealthcareProvider,
    getPendingHealthcareProviders,
    sendfeedbackresponse,
    getfeedbacks
}

module.exports = admin