"use strict";

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'phettairT09@gmail.com',
    pass: 'Realzaa2020__'
  }
});

exports.SendEmail = function (toEmail, message) {
  var mailOptions = {
    from: 'phettairT09@gmail.com',
    to: toEmail,
    subject: 'Give for child - เวลานัดหมาย',
    text: message
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};