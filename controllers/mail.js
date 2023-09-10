import nodemailer from 'nodemailer';

export const sendOtp = async (req, res) => {
  const { otp, email } = req.body;
  console.log(otp,email)
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user:process.env.EMAIL, 
        pass: process.env.PASS,
      },
    });
console.log('fsfsd566')
    // Email data
    const mailOptions = {
      from: 'sih202227@gmail.com', 
      to: email, 
      subject: 'Verify Email', 
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f2f2f2;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              h3 {
                color: #555;
              }
              .otp {
                font-size: 24px;
                font-weight: bold;
                color: #007bff;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Email Verification</h1>
              <h3>Your Verification OTP is: <span class="otp">${otp}</span></h3>
            </div>
          </body>
        </html>
      `,
    };
    

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json('Email sent successfully');
      }
    });
  } catch (error) {
    res.status(500).json('Error');
  }
};
