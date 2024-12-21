const nodemailer = require('nodemailer');

jest.setTimeout(10000); // Set the timeout to 10 seconds (or higher if needed)

test('SMTP email sending', async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use 'true' for port 465
    auth: {
      user: '2200016116@webmail.uad.ac.id', // Replace with your username
      pass: 'isbt nvcv ztjn lpin', // Replace with your app password
    },
  });

  const mailOptions = {
    from: '2200016116@webmail.uad.ac.id',
    to: 'asti02sulistio@gmail.com',
    subject: 'Test Email from Node.js', // Clear subject
    text: 'Hello, this is a test email sent from Node.js script!', // Plain text message
    html: '<p>Hello, this is a <b>test email</b> sent from Node.js script!</p>', // Optional HTML message
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);
});
