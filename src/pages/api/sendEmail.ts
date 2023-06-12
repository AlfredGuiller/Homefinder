import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;
    
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'lambino252@gmail.com', 
        pass: 'zdmkibclelamtsus' 
      }
    });
    
    try {
     
      await transporter.sendMail({
        from: 'lambino252@gmail.com',
        to: 'lambino252@gmail.com', 
        subject: `New Message from ${name}`,
        text: `From: ${name}\nEmail: ${email}\nMessage: ${message}`
      });
      
      res.status(200).end();
    } catch (error) {
      console.error(error);
      res.status(500).end();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
