const router = require("express").Router();
const { verifyToken } = require("../middleware/authorization");
const payment = require('../controllers/payment_en_ligne')


router.post('/create' /*verifyToken*/, payment.createPayment)
router.get('/paymentsuccess', payment.paymentsuccess)
router.get('/paymentfailure', payment.paymentfailure)
router.get('/notification_payment', payment.notification_payment)


module.exports = router