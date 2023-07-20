const db = require('../models/models')
const notificationAdmin = require('./push_notification')
const SALT = process.env.AUTH_SALT;
const bcrypt = require('bcrypt');



const userData = async (req, res) => {
    try {
        let user = await db.User.findById(req.user.id)
        if (!user) {
            return res.status(404).json('user not found')
        }
        return res.status(200).json({
            status: true,
            data: user
        })
    } catch (err) {
        return res.status(501).json(err.message);
    }
}
const searchProfile = async (req, res) => {
    let search = req.body.search;
    let regex = new RegExp(search, "i");
    try {
        let query = {
            $or: [
                { name: { $regex: regex } },
                { type: { $regex: regex } },
                { role: { $regex: regex } },
                { speciality: { $regex: regex } }
            ],
            _id: { $ne: req.user.id }
        };

        let user = await db.User.findById(req.user.id);
        if (user.role === "Patient") {
            query.role = { $nin: ["Patient", "Admin"] };
            const users = await db.User.find(query);
            console.log(users)
            res.status(200).json({ status: true, date: users });

        } else if (user.role === 'HealthcareProvider' && Array.isArray(user.patients)) {

            const patientsId = user.patients.map((p) => p.patientId.toString());
            query.$or = [
                { _id: { $in: patientsId } },
                { role: 'HealthcareProvider' }
            ];
            const users = await db.User.find(query);
            res.status(200).json({ status: true, date: users });
        } else {
            res.status(201).json({ status: false, message: 'no user found' });
        }
    } catch (err) {

        res.status(501).json(err.message);
    }
};
const userProfile = async (req, res) => {
    const { userID } = req.params;
    try {
        const user = await db.User.findById(userID);
        if (!user) {
            return res.status(404).json("User not found");
        }
        return res.status(200).json(
            {
                status: true,
                data: user
            }
        );

    } catch (err) {
        res.status(501).json(err);
    }
};
const updateProfile = async (req, res) => {
    try {


        const user = await db.Patient.findById(req.user.id) || await db.HealthcareProvider.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.emailVerif == false) {
            return res.status(404).json({ message: "Please verify your email address to proceed" });
        }


        const profileUpdates = {};

        if (user instanceof db.Patient) {

            const profileFields = ['address', 'phoneNumber', 'email', 'password', 'gender', 'firstname', 'lastname', 'dateofbirth', 'civilstate', 'nembredenfant'];


            await Promise.all(profileFields.map(async (field) => {
                if (req.body[field]) {
                    if (field == 'password') {
                        const salt = await bcrypt.genSalt(SALT);
                        const hashedPassword = await bcrypt.hash(req.body[field], salt);
                        profileUpdates[field] = hashedPassword;
                    } else {
                        profileUpdates[field] = req.body[field];
                    }
                }
            }));

        } else if (user instanceof db.HealthcareProvider) {

            let profileFields = [];

            if (user.type === 'Doctor') {

                profileFields = ['address', 'phoneNumber', 'email', 'password', 'gender', 'firstname', 'lastname', 'speciality', 'description', 'verifciation', 'appointmentprice'];

            } else {

                profileFields = ['address', 'phoneNumber', 'email', 'password', 'name', 'description', 'verifciation'];
            }


            await Promise.all(profileFields.map(async (field) => {
                if (req.body[field]) {
                    if (field == 'password') {
                        const salt = await bcrypt.genSalt(SALT);
                        const hashedPassword = await bcrypt.hash(req.body[field], salt);
                        profileUpdates[field] = hashedPassword;
                    } else {
                        profileUpdates[field] = req.body[field];
                    }
                }
            }));
        }


        Object.assign(user, profileUpdates);

        const updatedProfile = await user.save();
        if (updatedProfile.role === 'HealthcareProvider') {
            const admin = await db.User.findOne({ role: 'Admin' });

            const notification = new db.Notification({
                userId: admin._id,
                message: 'Please check new signup attempt',
            });
            await notification.save();

            const notificationData = {
                id: notification._id,
                fileId: updatedProfile._id,
                title: `New ${updatedProfile.type} Signup`,
                body: 'Please check new signup attempt',
            };

            await notificationAdmin.sendPushNotification(admin._id, notificationData);
        }

        res.status(200).json({ message: 'Profile updated successfully', data: updatedProfile });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the profile' });
    }
};
const checkUser = async (req, res) => {
    try {
        const userID = req.params.userID;
        let user;


        if (req.userRole === 'Patient') {
            user = await db.Patient.findById(req.user.id).lean();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const provider = user.healthcareproviders.find(
                (provider) => provider.healthcareproviderId.toString() === userID
            );

            if (!provider) {
                return res.status(200).json({ status: false, message: 'notfollowed', data: provider });
            }

            if (provider.status === 'Pending') {
                return res.status(200).json({ status: false, message: 'Pending', data: provider });
            }

            return res.status(200).json({ status: true, message: 'Ok', data: provider });
        } else if (req.userRole === 'HealthcareProvider') {
            user = await db.HealthcareProvider.findById(req.user.id).lean();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const follower = await db.User.findById(userID);
            if (!follower) {
                return res.status(404).json({ message: 'User not found' });
            }

            if (follower.role === 'Patient') {
                const patient = user.patients.find(
                    (patient) => patient.patientId.toString() === userID
                );

                if (!patient) {
                    return res.status(200).json({ status: false, message: 'notfollowed', data: patient });
                }

                if (patient.status === 'Pending') {
                    return res.status(200).json({ status: false, message: 'Pending', data: patient });
                }

                return res.status(200).json({ status: true, message: "Ok", data: patient });
            } else if (follower.role === 'HealthcareProvider') {
                console.log(follower.role);
                const colleague = user.healthcareproviders.find(
                    (colleague) => colleague.healthcareproviderId.toString() === userID
                );

                if (!colleague) {
                    return res.status(200).json({ status: false, message: 'notfollowed', data: colleague });
                }

                if (colleague.status === 'Pending') {
                    return res.status(200).json({ status: false, message: 'Pending', data: colleague });
                }

                return res.status(200).json({ status: true, message: 'Ok', data: colleague });
            }
        }

        return res.status(400).json({ message: 'Invalid user role' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while checking user' });
    }
};
const addFeedback = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const feedback = new db.FeedBack({
            user: req.params.userId,
            rating,
            comment,
        });

        await feedback.save();

        const response = {
            message: 'Feedback added successfully',
            data: feedback,
        };
        const admin = await db.User.findOne({ role: 'Admin' })
        const notification = new db.Notification({
            userId: admin._id,
            message: `New feedback added`
        })
        await notification.save()
        const notificationData = {
            id: notification._id,
            fileId: feedback._id,
            title: `New feedback added`,
            body: `New feedback added`
        };
        await notificationAdmin.sendPushNotification(
            admin._id,
            notificationData
        );


        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const getfeedbackResponse = async (req, res) => {
    try {
        const userId = req.params.userId;

        const feedbacksWithResponse = await db.FeedBack.find({ user: userId }).populate('response');

        const feedbacks = feedbacksWithResponse.map((feedbackWithResponse) => {
            const feedback = feedbackWithResponse;
            const feedbackResponse = feedbackWithResponse.response;

            return {
                feedback: feedback.comment,
                response: feedbackResponse ? feedbackResponse.response : null,
            };
        });
        const notification = new db.Notification({
            userId: feedbacksWithResponse.user,
            message: `New feedback added`
        })
        await notification.save()
        const notificationData = {
            id: notification._id,
            fileId: feedbacksWithResponse._id,
            title: `New feedback added`,
            body: `New feedback added`
        };
        await notificationAdmin.sendPushNotification(
            admin._id,
            notificationData
        );



        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
const getDeviceToken = async (req, res) => {
    try {
        const userId = req.params.id;
        const token = req.body.token;


        let user = await db.User.findOneAndUpdate(
            { _id: userId },
            { $set: { deviceToken: token } },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        await user.save();

        res.status(200).json(user);
    } catch (error) {
        console.error('Error updating device token:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const user = {
    userData,
    searchProfile,
    userProfile,
    checkUser,
    addFeedback,
    getfeedbackResponse,
    updateProfile,
    getDeviceToken
}
module.exports = user