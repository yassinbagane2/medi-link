const fs = require("fs");
const path = require('path');
const FCM = require('fcm-node');
const db = require('../models/models');

const sendPushNotification = async (userId, message) => {
  try {
   

    fs.readFile(path.join(__dirname, '../firebaseConfig.json'), "utf8", async (err, jsonString) => {
      if (err) {
      
        return err;
      }

      try {
       
        const data = JSON.parse(jsonString);
        const serverKey = data.SERVER_KEY;
        const fcm = new FCM(serverKey);

        
        const user = await db.User.findById(userId);
        if (!user) {
        
          return;
        }

        
        const deviceToken = user.deviceToken;
        if (!deviceToken) {
          return;
        }

       
        const pushMessage = {
          to: deviceToken,
          notification: {
            title: message.title,
            body: message.body,
          },
          data: {
            id: String(message.id),
            fileId: String(message.fileId),
          },
        };

        fcm.send(pushMessage, (err, response) => {
          if (err) {
          
          } else {
           
          }
        });
      } catch (err) {
        
      }
    });
  } catch (error) {
    
  }
};

module.exports = { sendPushNotification };
