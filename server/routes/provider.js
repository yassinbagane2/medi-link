const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/authorization");
const provider = require('../controllers/provider');

router.get('/patients', verifyToken, provider.getPatients);
router.get('/pending-patients', verifyToken, provider.getPendingPatients);
router.get('/ratings-reviews/:providerId', verifyToken, provider.getProviderRatingsAndReviews);
router.post('/availability', verifyToken, provider.setavailibility);
router.post('/experience', verifyToken, provider.setexperience);
router.post('/education', verifyToken, provider.seteducation);
router.get('/availability/:id', verifyToken, provider.getavailibility);
router.get('/experience/:id', verifyToken, provider.getexperience);
router.get('/education/:id', verifyToken, provider.geteducation);
router.put('/availability/:UserId', verifyToken, provider.updateavailibility);
router.put('/experience/:UserId', verifyToken, provider.updateexperience);
router.put('/education/:UserId', verifyToken, provider.updateeducation);
module.exports = router;
