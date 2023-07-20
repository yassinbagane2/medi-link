const db = require("../models/models");

const getNotifications = async (req, res) => {
  try {
    const notifications = await db.Notification.find({ userId: req.user.id, read: false });

    await db.Notification.updateMany(
      { userId: req.user.id, read: false },
      { read: true }
    );

    res.status(200).json({ data: notifications, status: true });
  } catch (err) {
    res.status(500).json({ status: false, error: err });
  }
};

const readNotification = async (req, res) => {
  try {
    const notification = await db.Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }



    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getNotifications,
  readNotification
};
