const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
   try {
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
         },
      });

      const mailOptions = {
         from: `"TACSYNC Security" <${process.env.EMAIL}>`,
         to: options.email,
         subject: options.subject,
         html: options.html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(
         `Email successfully sent to ${options.email}: ${info.messageId}`
      );
   } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Email could not be sent');
   }
};

module.exports = sendEmail;
