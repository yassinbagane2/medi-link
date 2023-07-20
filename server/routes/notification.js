const express = require('express');
const router = express.Router();
const notification = require('../controllers/notification');
const { verifyToken } = require('../middleware/authorization');

router.get('/', verifyToken, notification.getNotifications);
router.put("/:id", verifyToken, notification.readNotification)

module.exports = router;
