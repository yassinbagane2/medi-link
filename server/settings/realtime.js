const db = require('../models/models');
const notificationAdmin = require('../controllers/push_notification')
const mesasge = require('../controllers/message');

const addUser = async (userId, socketId) => {
  try {
    let user = await db.User.findOneAndUpdate(
      { _id: userId },
      { $set: { connected: true, socketId: socketId } },
      { new: true }
    );

    if (!user) {
      return;
    }


  } catch (error) {

  }
};
const addNotification = async (userId, notification) => {
  try {
    const newNotification = new db.Notification({
      userId,
      message: notification.body
    });
    await newNotification.save();
    const notificationData = {
      id: newNotification._id,
      fileId: notification._id,
      title: notification.title,
      body: notification.body,
    };
    await notificationAdmin.sendPushNotification(
      userId,
      notificationData
    );


  } catch (error) {

  }
};

const getUserNotifications = async (userId) => {
  try {
    const userNotifications = await db.Notification.find({ userId: userId, read: false });


    await db.Notification.updateMany({ userId }, { $set: { read: true } });


    return userNotifications;
  } catch (error) {

    return [];
  }
};

const removeUser = async (socketId) => {
  try {
    let user = await db.User.findOneAndUpdate(
      { socketId: socketId },
      { $unset: { socketId: 1 }, $set: { connected: false } },
      { new: true }
    );

    if (!user) {

      return;
    }


  } catch (error) {

  }
};


const getConnectedUser = async (userId) => {
  try {
    const user = await db.User.findOne({ _id: userId, connected: true });
    if (user) {

      return user;
    } else {

      return null;
    }
  } catch (error) {

    return null;
  }
};


const realtime = (io) => {
  io.on("connection", (socket) => {
    console.log(`Connected: ${socket.id}`);
    socket.on('deleteNotification', async (notificationId) => {
      try {
        await db.Notification.findByIdAndDelete(notificationId);
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    });
    socket.on("addUser", async (userId) => {
      console.log(`Connected user: ${userId}`);
      try {
        await addUser(userId, socket.id);



        io.to(socket.id).emit(
          "arrivalNotifications",
          await getUserNotifications(userId)
        );
      } catch (error) {

      }
    });
    socket.on("sendMessage", async ({ senderId, receiverId, content }) => {
      const receiverSocket = await getConnectedUser(receiverId);
      const senderSocket = await getConnectedUser(senderId);
      console.log(senderSocket.name)
      let messageSent;

      messageSent = await mesasge.createMessageIo(senderId, receiverId, content);

      if (receiverSocket && receiverSocket.socketId) {
        socket.to(receiverSocket.socketId).emit("getMessage", {
          senderId: senderId,
          data: messageSent
        });
        const notificationData = {
          fileId: messageSent.conversationId,
          title: `New message from ${senderSocket.name}`,
          body: content,
        };

        await addNotification(receiverSocket._id, notificationData);
      }

      if (senderSocket && senderSocket.socketId) {
        socket.to(senderSocket.socketId).emit("messageSent", {
          data: messageSent
        });
      }
    });

    socket.on("follow", async (data) => {

      const { patientId, providerId } = data;

      try {
        const patient = await db.Patient.findById(patientId);
        const provider = await db.HealthcareProvider.findById(providerId);

        if (provider.type === "Doctor") {
          const hasSameSpecialtyProvider = patient.healthcareproviders.some(
            (hp) => hp.speciality === provider.speciality
          );
          if (hasSameSpecialtyProvider) {
            const patientSocket = await getConnectedUser(patientId);
            io.to(patientSocket.socketId).emit(
              "followRequestError",
              "You already have a healthcare provider with the same specialty."
            );
            return;
          }
        }

        const updatedProvider = await db.HealthcareProvider.findByIdAndUpdate(
          providerId,
          { $addToSet: { patients: { patientId: patientId, status: "Pending" } } },
          { new: true }
        );


        const updatedPatient = await db.Patient.findByIdAndUpdate(
          patientId,
          { $addToSet: { healthcareproviders: { healthcareproviderId: providerId, status: "Pending", type: provider.type, speciality: provider.speciality } } },
          { new: true }
        );


        if (!updatedPatient || !updatedProvider) {
          throw new Error("Patient or provider not found.");
        }

        const patientSocket = await getConnectedUser(patientId)
        const providerSocket = await getConnectedUser(providerId)

        io.to(patientSocket.socketId).emit(
          "followRequest",
          `You have sent a new follow request to ${provider.name}.`
        );
        if (providerSocket) {
          io.to(providerSocket.socketId).emit(
            "followRequestReceived",
            `You have a new follow request from ${updatedPatient.name}.`,
          )
        }

        const notificationData = {
          fileId: updatedPatient._id,
          title: "New follow request",
          body: `You have a new follow request from ${updatedPatient.name}.`,
        };
        await addNotification(providerId, notificationData);


      } catch (error) {

      }
    });
    socket.on("approveRequest", async (data) => {
      const { patientId, providerId } = data;

      try {
        const patient = await db.Patient.findOneAndUpdate(
          { _id: patientId, "healthcareproviders.healthcareproviderId": providerId },
          { $set: { "healthcareproviders.$.status": "Approved" } },
          { new: true }
        );


        const provider = await db.HealthcareProvider.findOneAndUpdate(
          { _id: providerId, "patients.patientId": patientId },
          { $set: { "patients.$.status": "Approved" } },
          { new: true }
        );


        if (!patient || !provider) {
          throw new Error("Patient or provider not found.");
        }
        const providerSocket = await getConnectedUser(providerId);
        const patientSocket = await getConnectedUser(patientId)
        if (patientSocket) {
          io.to(patientSocket.socketId).emit(
            "followApprovedReceived",
            `${provider.name} accepted your request`
          )
        }

        io.to(providerSocket.socketId).emit(
          "followApproved",
          `you have approved the follow request from ${patient.name}.`
        )
        const notificationData = {
          fileId: patient._id,
          title: `Follow Approved`,
          body: `${provider.name} accepted your request`,
        };

        await addNotification(patientId, notificationData);


      } catch (error) {

      }
    });
    socket.on("cancelRequest", async (data) => {
      const { patientId, providerId } = data;
      try {
        const patient = await db.Patient.findByIdAndUpdate(
          patientId,
          { $pull: { healthcareproviders: { healthcareproviderId: providerId } } },
          { new: true }
        );

        const provider = await db.HealthcareProvider.findByIdAndUpdate(
          providerId,
          { $pull: { patients: { patientId: patientId } } },
          { new: true }
        );


        if (!patient || !provider) {
          throw new Error("Patient or provider not found.");
        }
        const patientSocket = await getConnectedUser(patientId);
        const providerSocket = await getConnectedUser(providerId)

        if (providerSocket) {
          io.to(providerSocket.socketId).emit(
            'requestCanceled',
            `${patient.firstName} has cancelled your appointment.`
          )
        }
        io.to(patientSocket.socketId).emit(
          "followCanceled",
          `you have  canceled the follow request to ${provider.name}.`
        )
      } catch (error) {

      }
    });
    socket.on("unfollow", async (data) => {
      const { senderId, receiverId } = data;

      try {
        const sender = await db.User.findById(senderId);
        const receiver = await db.User.findById(receiverId);

        if (!sender || !receiver) {
          return;
        }

        const senderRole = sender.role;

        if (senderRole === 'Patient') {
          const patient = await db.Patient.findByIdAndUpdate(
            senderId,
            { $pull: { healthcareproviders: { healthcareproviderId: receiverId } } },
            { new: true }
          );

          const provider = await db.HealthcareProvider.findByIdAndUpdate(
            receiverId,
            { $pull: { patients: { patientId: senderId } } },
            { new: true }
          );
          const patientSocket = await getConnectedUser(senderId);
          const providerSocket = await getConnectedUser(receiverId)
          if (providerSocket) {
            io.to(providerSocket.socketId).emit(
              "unfollowRequest",
              `${patient.name} has removed you from their followers`
            )
          }

          io.to(patientSocket.socketId).emit(
            "unfollowSuccessPatient",
            `You unfollowed ${provider.name}`
          );

          const notificationData = {
            fileId: patient._id,
            title: `Unfollow`,
            body: `You were unfollowed by ${patient.name}`,
          };

          await addNotification(provider._id, notificationData);

        } else if (senderRole === 'HealthcareProvider') {
          const provider = await db.HealthcareProvider.findByIdAndUpdate(
            senderId,
            { $pull: { patients: { patientId: receiverId } } },
            { new: true }
          );

          const patient = await db.Patient.findByIdAndUpdate(
            receiverId,
            { $pull: { healthcareproviders: { healthcareproviderId: senderId } } },
            { new: true }
          );

          const providerSocket = await getConnectedUser(senderId);
          const patientSocket = await getConnectedUser(receiverId)
          if (patientSocket) {
            io.to(patientSocket.socketId).emit(
              "unfollowSuccessReceived",
              `${provider.name} has removed you from their followers`
            )
          }

          io.to(providerSocket.socketId).emit(
            "unfollowSuccess",
            `You unfollowed ${patient.name}`
          );
          const notificationData = {
            fileId: provider._id,
            title: `Unfollow`,
            body: `You were unfollowed by ${provider.name}`,
          };
          await addNotification(patient._id, notificationData);
        }
        const conversation = await db.Conversation.findOne({
          members: { $all: [senderId, receiverId] },
        });
        await db.Conversation.deleteOne({ _id: conversation._id });

      } catch (error) {
        return;
      }
    });
    socket.on("rejectRequest", async (data) => {
      const { patientId, providerId } = data;

      try {
        const patient = await db.Patient.findByIdAndUpdate(
          patientId,
          { $pull: { healthcareproviders: { healthcareproviderId: providerId } } },
          { new: true }
        );
        const provider = await db.HealthcareProvider.findByIdAndUpdate(
          providerId,
          { $pull: { patients: { patientId: patientId } } },
          { new: true }
        );

        if (!patient || !provider) {
          return;
        }


        const providerSocket = await getConnectedUser(providerId);
        const patientSocket = await getConnectedUser(patientId)
        if (patientSocket) {
          io.to(patientSocket.socketId).emit(
            'rjectedRequest',
            `${provider.name} reject your request`
          )
        }

        io.to(providerSocket.socketId).emit(
          "rejectRequest",
          `You rejected ${patient.name}`
        );

        const notificationMessage = `Your follow request has been rejected by ${provider.name}`;

        const notificationData = {
          fileId: provider._id,
          title: `Request Rejected`,
          body: notificationMessage,
        };
        await addNotification(patientId, notificationData);


      } catch (err) {
        return;
      }
    });
    socket.on("disconnect", async () => {
      try {
        console.log(`Disconnected: ${socket.id}`);
        removeUser(socket.id)
      } catch (error) {

      }
    });
  });
};
module.exports = realtime
