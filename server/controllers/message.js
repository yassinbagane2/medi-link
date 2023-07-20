const db = require("../models/models");

const createMessageIo = async (senderId, receiverId, content) => {
  let conversation;
  try {
    conversation = await db.Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      const newConversation = new db.Conversation({
        members: [senderId, receiverId],
      });
      conversation = await newConversation.save();
    }
  } catch (err) {
    console.error(err);
    return;
  }

  try {
    const message = new db.Message({
      sender: senderId,
      receiver: receiverId,
      content: content,
      conversationId: conversation._id,
    });
    await message.save();
    return message;
  } catch (error) {
    console.error(error);
  }
}

const getConversationMessages = async (req, res) => {
  try {
    const messages = await db.Message.find({
      conversationId: req.params.conversationID,
    }).populate('sender', 'name').populate('receiver', 'name');
    if (!message) {
      res.status(201).json({
        status: false
      })
    }
    res.status(200).json({ status: true, data: messages });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getConversationMessagesusingID = async (req, res) => {
  const receiverId = req.params.receiverId;
  const senderId = req.user.id;

  try {
    const conversation = await db.Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    }).exec();

    if (!conversation) {
      return res.status(201).json({ status: false });
    }

    const messages = await db.Message.find({ conversationId: conversation._id }).exec();
    res.status(200).json({ status: true, data: messages });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


const message = {
  getConversationMessages,
  createMessageIo,
  getConversationMessagesusingID
};

module.exports = message;
