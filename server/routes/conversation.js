const express = require('express');
const { verifyToken } = require('../middleware/authorization');
const userConversations = require('../controllers/conversation');
const router = express.Router();

router.get('/', verifyToken, userConversations);

module.exports = router;
