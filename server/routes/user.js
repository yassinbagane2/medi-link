const router = require('express').Router()
const user = require('../controllers/user')
const { verifyToken } = require('../middleware/authorization')


router.get('/', verifyToken, user.userData)
router.post('/search', verifyToken, user.searchProfile)
router.get('/:userID', verifyToken, user.userProfile)
router.get('/users/:userID', verifyToken, user.checkUser)
router.post('/:userId/feedbacks', verifyToken, user.addFeedback);
router.get('/feedbacks/:userId', verifyToken, user.getfeedbackResponse);
router.put('/profile', verifyToken, user.updateProfile);
router.put('/:id/device-token', verifyToken, user.getDeviceToken)






module.exports = router