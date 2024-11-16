const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
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
        host: 'smtp.gmail.com', // أو حسب مزود بريدك
        port:465,
        secure:true,
        auth: {
          user: 'drbalyasser@gmail.com',  // استبدلها ببريدك
          pass: 'syra ifbt lxqk xhtj'    // استبدلها بكلمة السر
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
