const db = require("../models/models")
require("dotenv").config();
const axios = require("axios");
const linkapi = process.env.LINK_API;
const createPayment = async (req, res) => {
  const { doctorId, patientId, appointmentId } = req.body;
  try {
    let doctor = await db.User.findById(doctorId);
    let patient = await db.User.findById(patientId);
    let appointment = await db.Appointment.findById(appointmentId);
    if (!doctor || !patient || !appointment) {
      return res.status(400).json({ error: "required body" });
    }
    console.log(
      process.env.PAYMENT_WALLET_ID,
      process.env.LINK_PAYMENT_API,
      process.env.PAYMENT_API_KEY
    );
    const cost = Number(doctor.appointmentprice);
    const paymentData = {
      receiverWalletId: process.env.PAYMENT_WALLET_ID,
      token: "TND",
      amount: cost * 1000,
      type: "immediate",
      description: "payment description",
      lifespan: 10,
      feesIncluded: true,
      firstName: "mohamed aziz",
      lastName: "taher",
      phoneNumber: "50335902",
      email: "mouhamedaziztaher0@gmail.com",
      orderId: "12345678",
      webhook: `${linkapi}/api/payment/notification_payment?patientId=${encodeURIComponent(
        patientId
      )}&doctorId=${encodeURIComponent(
        doctorId
      )}&appointmentId=${encodeURIComponent(appointmentId)}`,
      silentWebhook: false,
      successUrl: `${linkapi}/api/payment/paymentsuccess`,
      failUrl: `${linkapi}/api/payment/paymentfailure`,
      checkoutForm: true,
      acceptedPaymentMethods: ["bank_card", "e-DINAR", "flouci"],
    };
    const { data } = await axios.post(
      `${process.env.LINK_PAYMENT_API}/init-payment`,
      paymentData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.PAYMENT_API_KEY,
        },
      }
    );
    res.send(data);
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};
const paymentsuccess = async (req, res) => {

  res.send(`
<html>
<head>
  <style>
    /* Add the provided CSS styles for the success message and animation */
    body {
      background: #999;
    }

    .container {
      max-width: 380px;
      margin: 30px auto;
      overflow: hidden;
    }

    .printer-top {
      z-index: 1;
      border: 6px solid #666666;
      height: 6px;
      border-bottom: 0;
      border-radius: 6px 6px 0 0;
      background: #333333;
    }

    .printer-bottom {
      z-index: 0;
      border: 6px solid #666666;
      height: 6px;
      border-top: 0;
      border-radius: 0 0 6px 6px;
      background: #333333;
    }

    .paper-container {
      position: relative;
      overflow: hidden;
      height: 467px;
    }

    .paper {
      background: #ffffff;
      height: 447px;
      position: absolute;
      z-index: 2;
      margin: 0 12px;
      margin-top: -12px;
      animation: print 10s cubic-bezier(0.68, -0.55, 0.265, 0.9) infinite;
      -moz-animation: print 10s cubic-bezier(0.68, -0.55, 0.265, 0.9) infinite;
    }

    .main-contents {
      margin: 0 12px;
      padding: 24px;
    }

    /* Paper Jagged Edge */
    .jagged-edge {
      position: relative;
      height: 20px;
      width: 100%;
      margin-top: -1px;
    }

    .jagged-edge:after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      height: 20px;
      background: linear-gradient(45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%),
        linear-gradient(-45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%);
      background-size: 16px 40px;
      background-position: 0 -20px;
    }

    .success-icon {
      text-align: center;
      font-size: 48px;
      height: 72px;
      background: #359d00;
      border-radius: 50%;
      width: 72px;
      height: 72px;
      margin: 16px auto;
      color: #fff;
    }

    .success-title {
      font-size: 22px;
      text-align: center;
      color: #666;
      font-weight: bold;
      margin-bottom: 16px;
    }

    .success-description {
      font-size: 15px;
      line-height: 21px;
      color: #999;
      text-align: center;
      margin-bottom: 24px;
    }

    .order-details {
      text-align: center;
      color: #333;
      font-weight: bold;
    }

    .order-details .order-number-label {
      font-size: 18px;
      margin-bottom: 8px;
    }

    .order-details .order-number {
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      line-height: 48px;
      font-size: 48px;
      padding: 8px 0;
      margin-bottom: 24px;
    }

    .order-footer {
      text-align: center;
      line-height: 18px;
      font-size: 18px;
      margin-bottom: 8px;
      font-weight: bold;
      color: #999;
    }

    @keyframes print {
      0% {
        transform: translateY(-90%);
      }
      100% {
        transform: translateY(0%);
      }
    }

    @-webkit-keyframes print {
      0% {
        -webkit-transform: translateY(-90%);
      }
      100% {
        -webkit-transform: translateY(0%);
      }
    }

    @-moz-keyframes print {
      0% {
        -moz-transform: translateY(-90%);
      }
      100% {
        -moz-transform: translateY(0%);
      }
    }

    @-ms-keyframes print {
      0% {
        -ms-transform: translateY(-90%);
      }
      100% {
        -ms-transform: translateY(0%);
      }
    }
  </style>
  <script>
    
    setTimeout(function() {
      var paper = document.querySelector('.paper');
      paper.style.animation = 'none'; 
      paper.offsetHeight; 
      paper.style.animation = null; 
    }, 7000); 
  </script>
</head>
<body>
  <div class="container">
    <div class="printer-top"></div>

    <div class="paper-container">
      <div class="printer-bottom"></div>

      <div class="paper">
        <div class="main-contents">
          <div class="success-icon">&#10004;</div>
          <div class="success-title">
            Payment Complete
          </div>
          <div class="success-description">
           Your payment was successful! Thank you for your purchase.
          </div>
          <div class="order-details">
            <div class="order-number-label">Order Number</div>
            <div class="order-number">123456789</div>
          </div>
          <div class="order-footer">Thank you!</div>
        </div>
        <div class="jagged-edge"></div>
      </div>
    </div>
  </div>
</body>
</html>
`);
}

const paymentfailure = async (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          /* Add the provided CSS styles for the failure message and animation */
          body {
            background: #999;
          }

          .container {
            max-width: 380px;
            margin: 30px auto;
            overflow: hidden;
          }

          .printer-top {
            z-index: 1;
            border: 6px solid #666666;
            height: 6px;
            border-bottom: 0;
            border-radius: 6px 6px 0 0;
            background: #333333;
          }

          .printer-bottom {
            z-index: 0;
            border: 6px solid #666666;
            height: 6px;
            border-top: 0;
            border-radius: 0 0 6px 6px;
            background: #333333;
          }

          .paper-container {
            position: relative;
            overflow: hidden;
            height: 467px;
          }

          .paper {
            background: #ffffff;
            height: 447px;
            position: absolute;
            z-index: 2;
            margin: 0 12px;
            margin-top: -12px;
            animation: print 10s cubic-bezier(0.68, -0.55, 0.265, 0.9) infinite;
            -moz-animation: print 10s cubic-bezier(0.68, -0.55, 0.265, 0.9) infinite;
          }

          .main-contents {
            margin: 0 12px;
            padding: 24px;
          }

          /* Paper Jagged Edge */
          .jagged-edge {
            position: relative;
            height: 20px;
            width: 100%;
            margin-top: -1px;
          }

          .jagged-edge:after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            right: 0;
            height: 20px;
            background: linear-gradient(45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%),
              linear-gradient(-45deg, transparent 33.333%, #ffffff 33.333%, #ffffff 66.667%, transparent 66.667%);
            background-size: 16px 40px;
            background-position: 0 -20px;
          }

          .failure-icon {
            text-align: center;
            font-size: 48px;
            height: 72px;
            background: #d40000;
            border-radius: 50%;
            width: 72px;
            height: 72px;
            margin: 16px auto;
            color: #fff;
          }

          .failure-title {
            font-size: 22px;
            text-align: center;
            color: #666;
            font-weight: bold;
            margin-bottom: 16px;
          }

          .failure-description {
            font-size: 15px;
            line-height: 21px;
            color: #999;
            text-align: center;
            margin-bottom: 24px;
          }

          .order-details {
            text-align: center;
            color: #333;
            font-weight: bold;
          }

          .order-details .order-number-label {
            font-size: 18px;
            margin-bottom: 8px;
          }

          .order-details .order-number {
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            line-height: 48px;
            font-size: 48px;
            padding: 8px 0;
            margin-bottom: 24px;
          }

          .order-footer {
            text-align: center;
            line-height: 18px;
            font-size: 18px;
            margin-bottom: 8px;
            font-weight: bold;
            color: #999;
          }

          @keyframes print {
            0% {
              transform: translateY(-90%);
            }
            100% {
              transform: translateY(0%);
            }
          }

          @-webkit-keyframes print {
            0% {
              -webkit-transform: translateY(-90%);
            }
            100% {
              -webkit-transform: translateY(0%);
            }
          }

          @-moz-keyframes print {
            0% {
              -moz-transform: translateY(-90%);
            }
            100% {
              -moz-transform: translateY(0%);
            }
          }

          @-ms-keyframes print {
            0% {
              -ms-transform: translateY(-90%);
            }
            100% {
              -ms-transform: translateY(0%);
            }
          }
        </style>
        <script>
      
          setTimeout(function() {
            var paper = document.querySelector('.paper');
            paper.style.animation = 'none'; 
            paper.offsetHeight; 
            paper.style.animation = null; 
          }, 7000); 
        </script>
      </head>
      <body>
        <div class="container">
          <div class="printer-top"></div>

          <div class="paper-container">
            <div class="printer-bottom"></div>

            <div class="paper">
              <div class="main-contents">
                <div class="failure-icon">&#10006;</div>
                <div class="failure-title">
                  Payment Failure
                </div>
                <div class="failure-description">
                  Your payment was unsuccessful. Please try again later.
                </div>
                <div class="order-details">
                  <div class="order-number-label">Order Number</div>
                  <div class="order-number">123456789</div>
                </div>
                <div class="order-footer">Sorry for the inconvenience!</div>
              </div>
              <div class="jagged-edge"></div>
            </div>
          </div>
        </div>
      </body>
    </html>
  `);
}

const notification_payment = async (req, res) => {
  try {
    const paymentRef = req.query.payment_ref;
    const url = `${process.env.LINK_PAYMENT_API}/${paymentRef}`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const paymentStatus = response.data.payment.transactions[0].status;
    if (paymentStatus !== "success") {
      return res.redirect(`${linkapi}/api/payment/paymentfailure`);
    }
    const {
      appointmentId,
      patientId,
      doctorId
    } = req.query;

    const appointment = await db.Appointment.findByIdAndUpdate(
      { _id: appointmentId },
      { $set: { payed: true } },
      { new: true });

    await appointment.save()
    res.redirect(`${linkapi}/api/payment/paymentsuccess`);

  } catch (e) {
    console.log(e)
    return res.redirect(`${linkapi}/api/payment/paymentfailure`);

  }
}
const payment = {
  createPayment,
  paymentsuccess,
  paymentfailure,
  notification_payment
}

module.exports = payment