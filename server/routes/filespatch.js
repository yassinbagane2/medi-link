const router = require('express').Router()
const { verifyToken } = require('../middleware/authorization')
const upload = require('../middleware/upload')
const filepatch = require('../controllers/filepatch')


router.patch('/profile-picture', verifyToken, upload.profilePicture.single('file'), filepatch.profilePicture)
router.delete('/profile-picture', verifyToken, filepatch.deleteProfilePicture);
router.patch('/building-picture', verifyToken, upload.buildingpictures.single('file'), filepatch.addBuildingPicture);
router.patch('/building-picture/:pictureId', verifyToken, upload.buildingpictures.single('file'), filepatch.updateBuildingPicture);
router.delete('/building-picture/:pictureId', verifyToken, filepatch.deleteBuildingPicture);
router.patch('/verification-image', verifyToken, upload.provider_verififcation.single('file'), filepatch.addVerificationImage);
router.patch('/verification-image/:verificationId', verifyToken, upload.provider_verififcation.single('file'), filepatch.updateVerificationImage);
router.delete('/verification-image/:verificationId', verifyToken, filepatch.deleteVerificationImage);
router.patch('/surgery-file/:surgeryId', verifyToken, upload.surgerie.single('file'), filepatch.addSurgeryFile);
router.patch('/surgery-file/:surgeryId/:fileId', verifyToken, upload.surgerie.single('file'), filepatch.updateSurgeryFile);
router.delete('/surgery-file/:surgeryId/:fileId', verifyToken, filepatch.deleteSurgeryFile);
router.patch('/mri-result-file/:mriRecordId', verifyToken, upload.radiographie.single('file'), filepatch.addMRIResultFile);
router.patch('/mri-result-file/:mriRecordId/:fileId', verifyToken, upload.radiographie.single('file'), filepatch.updateMRIResultFile);
router.delete('/mri-result-file/:mriRecordId/:fileId', verifyToken, filepatch.deleteMRIResultFile);
router.patch('/feedback-file/:feedbackId', verifyToken, upload.feedbacks.single('file'), filepatch.addfeedbackFile);
router.patch('/experience-file/:experienceId', verifyToken, upload.experience_verififcation.single('file'), filepatch.addExperienceFile);
router.patch('/experience-file/:experienceId/:fileId', verifyToken, upload.experience_verififcation.single('file'), filepatch.updateExperienceFile);
router.delete('/experience-file/:experienceId/:fileId', verifyToken, filepatch.deleteExperienceFile);
router.patch('/education-file/:educationId', verifyToken, upload.education_verififcation.single('file'), filepatch.addEducationFile);
router.patch('/education-file/:experienceId/:fileId', verifyToken, upload.education_verififcation.single('file'), filepatch.updateEducationFile);
router.delete('/education-file/:experienceId/:fileId', verifyToken, filepatch.deleteEducationFile);
router.patch('/lab-file/:labId', verifyToken, upload.lab.single('file'), filepatch.addlabFile);
router.patch('/lab-file/:labId/:fileId', verifyToken, upload.lab.single('file'), filepatch.updateLabresultFile);
router.delete('/lab-file/:labId/:fileId', verifyToken, filepatch.deleteLabresultFile);
module.exports = router