const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Gunakan 'true' untuk port 465
  auth: {
    user: '2200016116@webmail.uad.ac.id', // Ganti dengan username Anda
    pass: 'isbt nvcv ztjn lpin', // Ganti dengan password aplikasi Anda
  },
});

const mailOptions = {
  from: '2200016116@webmail.uad.ac.id',
  to: 'asti02sulistio@gmail.com',
  subject: 'Test Email from Node.js', // Subject yang jelas
  text: 'Hello, this is a test email sent from Node.js script!', // Pesan teks biasa
  html: '<p>Hello, this is a <b>test email</b> sent from Node.js script!</p>', // Pesan HTML opsional
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error: ', error);
  }
  console.log('Email sent: ', info.response);
});
