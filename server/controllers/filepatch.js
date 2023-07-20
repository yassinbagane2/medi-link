const db = require('../models/models')


const profilePicture = async (req, res) => {
    try {
        const user = await db.User.findOneAndUpdate(
            { _id: req.user.id },
            {
                $set: {
                    picture: req.file.filename,
                },
            },
            { new: true }
        );

        const response = {
            message: 'Image successfully updated',
            data: user,
        };
        return res.status(200).send(response);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const deleteProfilePicture = async (req, res) => {
    try {
        const user = await db.User.findOneAndUpdate(
            { _id: req.user.id },
            {
                $pull: {
                    pictures: req.file.filename,
                },
            },
            { new: true }
        );

        const response = {
            message: 'Profile picture successfully deleted',
            data: user,
        };
        return res.status(200).send(response);
    } catch (err) {
        return res.status(500).send(err);
    }
};

const addBuildingPicture = async (req, res) => {
    try {
        const providerId = req.user.id;
        const pictureUrl = req.file.filename;

        const provider = await db.HealthcareProvider.findOne({ _id: providerId });

        provider.buildingpictures.push({ url: pictureUrl });

        const updatedProvider = await provider.save();

        const response = {
            message: 'Image successfully added',
            data: updatedProvider,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateBuildingPicture = async (req, res) => {
    try {
        const providerId = req.user.id;
        const pictureId = req.params.pictureId;
        const pictureUrl = req.file.filename;

        const provider = await db.HealthcareProvider.findOneAndUpdate(
            { _id: providerId, 'buildingpictures.url': pictureId },
            { $set: { 'buildingpictures.$.url': pictureUrl } },
            { new: true }
        );

        if (!provider) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const response = {
            message: 'Image successfully updated',
            data: provider,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteBuildingPicture = async (req, res) => {
    try {
        const providerId = req.user.id;
        const pictureId = req.params.pictureId;

        const provider = await db.HealthcareProvider.findOneAndUpdate(
            { _id: providerId },
            { $pull: { buildingpictures: { url: pictureId } } },
            { new: true }
        );

        if (!provider) {
            return res.status(404).json({ message: 'Image not found' });
        }

        const response = {
            message: 'Image successfully deleted',
            data: provider,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addVerificationImage = async (req, res) => {
    try {
        const providerId = req.user.id;
        const type = req.body.type;
        const imageUrl = req.file.filename;

        const provider = await db.HealthcareProvider.findOneAndUpdate(
            { _id: providerId },
            {
                $push: {
                    verification: { type, url: imageUrl },
                },
            },
            { new: true }
        );

        if (!provider) {
            return res.status(404).json({ message: 'Provider not found' });
        }

        const response = {
            message: 'Verification image successfully added',
            data: provider,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateVerificationImage = async (req, res) => {
    try {
        const providerId = req.user.id;
        const verificationId = req.params.verificationId;
        const imageUrl = req.file.filename;

        const provider = await db.HealthcareProvider.findOneAndUpdate(
            { _id: providerId, 'verification._id': verificationId },
            { $set: { 'verification.$.url': imageUrl } },
            { new: true }
        );

        if (!provider) {
            return res.status(404).json({ message: 'Provider or verification image not found' });
        }

        const response = {
            message: 'Verification image successfully updated',
            data: provider,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteVerificationImage = async (req, res) => {
    try {
        const providerId = req.user.id;
        const verificationId = req.params.verificationId;

        const provider = await db.HealthcareProvider.findOneAndUpdate(
            { _id: providerId },
            { $pull: { verification: { _id: verificationId } } },
            { new: true }
        );

        if (!provider) {
            return res.status(404).json({ message: 'Provider or verification image not found' });
        }

        const response = {
            message: 'Verification image successfully deleted',
            data: provider,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addSurgeryFile = async (req, res) => {
    try {
        const surgeryId = req.params.surgeryId;
        const fileUrl = req.file.filename;
console.log(surgeryId)
console.log(fileUrl)
        const surgery = await db.Surgery.findOneAndUpdate(
            { _id: surgeryId },
            {
                $push: {
                    files: {url: fileUrl },
                },
            },
            { new: true }
        );

        if (!surgery) {
            return res.status(404).json({ message: 'Surgery not found' });
        }

        const response = {
            message: 'File successfully added to surgery',
            data: surgery,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateSurgeryFile = async (req, res) => {
    try {
        const surgeryId = req.params.surgeryId;
        const fileId = req.params.fileId;
        const fileUrl = req.file.filename;

        const surgery = await db.Surgery.findOneAndUpdate(
            { _id: surgeryId, 'files._id': fileId },
            { $set: { 'files.$.url': fileUrl } },
            { new: true }
        );

        if (!surgery) {
            return res.status(404).json({ message: 'Surgery or file not found' });
        }

        const response = {
            message: 'File successfully updated for surgery',
            data: surgery,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteSurgeryFile = async (req, res) => {
    try {
        const surgeryId = req.params.surgeryId;
        const fileId = req.params.fileId;

        const surgery = await db.Surgery.findOneAndUpdate(
            { _id: surgeryId },
            { $pull: { files: { url: fileId } } },
            { new: true }
        );

        if (!surgery) {
            return res.status(404).json({ message: 'Surgery or file not found' });
        }

        const response = {
            message: 'File successfully deleted from surgery',
            data: surgery,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addMRIResultFile = async (req, res) => {
    try {
        const mriRecordId = req.params.mriRecordId;
        const fileUrl = req.file.filename;

        const mriRecord = await db.Radiographies.findOneAndUpdate(
            { _id: mriRecordId },
            {
                $push: {
                    result: { id: { $size: '$result' }, url: fileUrl },
                },
            },
            { new: true }
        );

        if (!mriRecord) {
            return res.status(404).json({ message: 'MRI Record not found' });
        }

        const response = {
            message: 'Result file successfully added to MRI Record',
            data: mriRecord,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateMRIResultFile = async (req, res) => {
    try {
        const mriRecordId = req.params.mriRecordId;
        const fileId = req.params.fileId;
        const fileUrl = req.file.filename;

        const mriRecord = await db.Radiographies.findOneAndUpdate(
            { _id: mriRecordId, 'result.id': fileId },
            { $set: { 'result.$.url': fileUrl } },
            { new: true }
        );

        if (!mriRecord) {
            return res.status(404).json({ message: 'MRI Record or result file not found' });
        }

        const response = {
            message: 'Result file successfully updated for MRI Record',
            data: mriRecord,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteMRIResultFile = async (req, res) => {
    try {
        const mriRecordId = req.params.mriRecordId;
        const fileId = req.params.fileId;

        const mriRecord = await db.Radiographies.findOneAndUpdate(
            { _id: mriRecordId },
            { $pull: { result: { id: fileId } } },
            { new: true }
        );

        if (!mriRecord) {
            return res.status(404).json({ message: 'MRI Record or result file not found' });
        }

        const response = {
            message: 'Result file successfully deleted from MRI Record',
            data: mriRecord,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addfeedbackFile = async (req, res) => {
    try {
        const feedbackId = req.params.feedbackId;
        const fileUrl = req.file.filename;

        const feedback = await db.FeedBack.findOneAndUpdate(
            { _id: feedbackId },
            {
                $push: {
                    files: { id: { $size: '$files' }, url: fileUrl },
                },
            },
            { new: true }
        );

        if (!feedback) {
            return res.status(404).json({ message: 'feedback not found' });
        }

        const response = {
            message: 'Result file successfully added to feedback',
            data: feedback,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addExperienceFile = async (req, res) => {
    try {
        const experienceId = req.params.experienceId;
        const type = req.body.type
        const fileUrl = req.file.filename;

        const experience = await db.Experience.findOneAndUpdate(
            { _id: experienceId },
            {
                $push: {
                    file: { type, id: { $size: '$file' }, url: fileUrl },
                },
            },
            { new: true }
        );

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        const response = {
            message: 'File successfully added to Experience',
            data: experience,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const updateExperienceFile = async (req, res) => {
    try {
        const experienceId = req.params.experienceId;
        const fileId = req.params.fileId;
        const fileUrl = req.file.filename;

        const experience = await db.Experience.findOneAndUpdate(
            { _id: experienceId, 'file.id': fileId },
            { $set: { 'file.$.url': fileUrl } },
            { new: true }
        );

        if (!experience) {
            return res.status(404).json({ message: 'Experience or file not found' });
        }

        const response = {
            message: 'File successfully updated for Experience',
            data: experience,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteExperienceFile = async (req, res) => {
    try {
        const experienceId = req.params.experienceId;
        const fileId = req.params.fileId;

        const experience = await db.Experience.findOneAndUpdate(
            { _id: experienceId },
            { $pull: { file: { id: fileId } } },
            { new: true }
        );

        if (!experience) {
            return res.status(404).json({ message: 'Experience or file not found' });
        }

        const response = {
            message: 'File successfully deleted from Experience',
            data: experience,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const addEducationFile = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        const type = req.body.type
        const fileUrl = req.file.filename;

        const education = await db.Education.findOneAndUpdate(
            { _id: educationId },
            {
                $push: {
                    file: { type, id: { $size: '$file' }, url: fileUrl },
                },
            },
            { new: true }
        );

        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }

        const response = {
            message: 'File successfully added to Education',
            data: education,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const updateEducationFile = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        const fileId = req.params.fileId;
        const fileUrl = req.file.filename;

        const education = await db.Education.findOneAndUpdate(
            { _id: educationId, 'file.id': fileId },
            { $set: { 'file.$.url': fileUrl } },
            { new: true }
        );

        if (!education) {
            return res.status(404).json({ message: 'Education or file not found' });
        }

        const response = {
            message: 'File successfully updated for Education',
            data: education,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const deleteEducationFile = async (req, res) => {
    try {
        const educationId = req.params.educationId;
        const fileId = req.params.fileId;

        const education = await db.Education.findOneAndUpdate(
            { _id: educationId },
            { $pull: { file: { id: fileId } } },
            { new: true }
        );

        if (!education) {
            return res.status(404).json({ message: 'Education or file not found' });
        }

        const response = {
            message: 'File successfully deleted from Education',
            data: education,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const addlabFile = async (req, res) => {
    try {
        const labId = req.params.labId;
        const fileUrl = req.file.filename;

        const labresult = await db.Labresult.findByIdAndUpdate(
            labId,
            {
                $push: {
                    files: { url: fileUrl },
                },
            },
            { new: true }
        );

        if (!labresult) {
            return res.status(404).json({ message: 'Labresult not found' });
        }

        const response = {
            message: 'File successfully added to labresult',
            data: labresult,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updateLabresultFile = async (req, res) => {
    try {
        const labId = req.params.labId;
        const fileId = req.params.fileId;
        const fileUrl = req.file.filename;

        const labresult = await db.Labresult.findOneAndUpdate(
            { _id: labId, 'files.url': fileId },
            { $set: { 'files.$.url': fileUrl } },
            { new: true }
        );

        if (!labresult) {
            return res.status(404).json({ message: 'labresult or file not found' });
        }

        const response = {
            message: 'File successfully updated for labresult',
            data: labresult,
        };

        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteLabresultFile = async (req, res) => {
    try {
        const labId = req.params.labId;
        const fileId = req.params.fileId;
        console.log('Removing file:', fileId, 'from lab result:', labId);

        const fileName = fileId; 
        console.log('File name:', fileName);

        const labresult = await db.Labresult.findOneAndUpdate(
             labId ,
            { $pull: { files: { url: fileName } } },
            { new: true }
        );
        console.log('Updated labresult:', labresult);

        if (!labresult) {
            console.log('Lab result not found');
            return res.status(404).json({ message: 'Lab result or file not found' });
        }

        const response = {
            message: 'File successfully deleted from lab result',
            data: labresult,
        };

        return res.status(200).json(response);
    } catch (err) {
        console.log('Error deleting file:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
const filepatch = {
    profilePicture,
    addlabFile,
    addBuildingPicture,
    addEducationFile,
    addExperienceFile,
    addMRIResultFile,
    addSurgeryFile,
    addVerificationImage,
    addfeedbackFile,
    updateLabresultFile,
    updateBuildingPicture,
    updateEducationFile,
    updateExperienceFile,
    updateMRIResultFile,
    updateSurgeryFile,
    updateVerificationImage,
    deleteLabresultFile,
    deleteBuildingPicture,
    deleteEducationFile,
    deleteExperienceFile,
    deleteMRIResultFile,
    deleteSurgeryFile,
    deleteVerificationImage,
    deleteProfilePicture,
}

module.exports = filepatch
