const nodemailer = require('nodemailer');

// Set a custom timeout to avoid Jest's default 5s timeout
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
    to: 'asti02sulistio@gmail.com', // Replace with a valid recipient
    subject: 'Test Email from Node.js', // Clear subject
    text: 'Hello, this is a test email sent from Node.js script!', // Plain text message
    html: '<p>Hello, this is a <b>test email</b> sent from Node.js script!</p>', // Optional HTML message
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('Email sent:', info.response);

  // Optional: Add assertion to verify the email was successfully sent
  expect(info.response).toMatch(/250/);  // Checking the SMTP success response code (250 means OK)
});
