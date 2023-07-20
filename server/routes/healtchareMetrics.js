const router = require('express').Router()
const { verifyToken } = require('../middleware/authorization')
const healthcareMetrics = require('../controllers/healthcareMetrics')


router.get('/:patientId/:metricName', verifyToken, healthcareMetrics.getUserMetric)
router.get('/:patientId', verifyToken, healthcareMetrics.getAllUserMetrics)
router.post('/', verifyToken, healthcareMetrics.addUserMetric)


module.exports = router