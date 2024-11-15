const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://portfulio-2o96.vercel.app/",
    methods: ["GET", "POST"],
  })
);
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = 5000;
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body; // هنا نستلم البيانات من req.body مباشرة
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // أو حسب مزود بريدك
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // الإيميل من .env
      pass: process.env.EMAIL_PASS  // كلمة السر من .env
  }
  });
  const mailOptions = {
    from: email,
    to: "drbalyasser@gmail.com", // بريدك الذي سترسل إليه الرسائل
    subject: `رسالة من ${name}`,
    text: message,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("تم إرسال الرسالة بنجاح");
  } catch (error) {
    res.status(500).send("حدث خطأ أثناء إرسال الرسالة");
  }
});
const path = require('path');

// تقديم ملفات React
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
