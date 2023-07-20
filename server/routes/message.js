const express = require('express');
const router = express.Router();
const message = require('../controllers/message');
const { verifyToken } = require('../middleware/authorization');


router.get('/:conversationID/messagesConv', verifyToken, message.getConversationMessages)
router.get('/:receiverId/messagesUser',verifyToken,message.getConversationMessagesusingID)

module.exports = router