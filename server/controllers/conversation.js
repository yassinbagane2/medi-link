const db = require('../models/models');


const userConversations = async (req, res) => {
  try {
    console.log(req.user.id)
    const conversations = await db.Conversation.find({ members: req.user.id });
    console.log(conversations)
    const conversationDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const lastMessage = await db.Message.findOne({ conversationId: conversation._id })
          .sort({ createdAt: -1 })
          .exec();

        const otherMember = await db.User.findOne({ _id: { $ne: req.user.id, $in: conversation.members } });
        console.log("conversation ",conversation)
        return {
          id: otherMember._id,
          name: otherMember.name,
          picture: otherMember.picture,
          other: {
            _id: conversation._id,
            updatedAt: conversation.updatedAt,
            members: conversation.members,
          },
          lastMessage: lastMessage ? lastMessage.content : null,
        };
      })
    );

    res.status(200).json({ status: true, data: conversationDetails });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to fetch conversations' });
  }
};

module.exports = userConversations;