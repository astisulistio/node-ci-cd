// smtp-test.test.js
const nodemailer = require('nodemailer');

test('SMTP email sending', async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use 'true' for port 465
    auth: {
      user: '2200016116@webmail.uad.ac.id',
      pass: 'isbt nvcv ztjn lpin', // Replace with actual credentials
    },
  });

  const mailOptions = {
    from: '2200016116@webmail.uad.ac.id',
    to: 'asti02sulistio@gmail.com',
    subject: 'Test Email from Node.js',
    text: 'Hello, this is a test email sent from Node.js script!',
    html: '<p>Hello, this is a <b>test email</b> sent from Node.js script!</p>',
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);

  // You can optionally add an assertion
  expect(info.response).toContain('250');
});
