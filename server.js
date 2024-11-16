const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = 5000;
app.post("/contact", async (req, res) => {
    const { name, email, message } = req.body; // هنا نستلم البيانات من req.body مباشرة
    console.log(req.body)
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
      }
  });
      const mailOptions = {
        from: email,
        to: 'drbalyasser@gmail.com', // بريدك الذي سترسل إليه الرسائل
        subject: `رسالة من ${name}`,
        text: message
      };
      try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('تم إرسال الرسالة بنجاح');
      } catch (error) {
        res.status(500).send('حدث خطأ أثناء إرسال الرسالة');
      }
});


  
app.listen(port, () => {
    console.log("Server is running on port", port);
});
