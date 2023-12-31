import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fname, lname, number, email, message } = req.body;

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
        subject: 'New Message from Home Finder',
        html: `
        <h1>New Message from Home Finder</h1>
        <p>You have received a new message from a potential home finder:</p>

        <h2>Contact Details:</h2>
        <p><strong>Name:</strong> ${fname} ${lname} </p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Email:</strong> ${number}</p>

        <h2>Message:</h2>
        <p>${message}</p>

        <p>Please respond promptly to assist the individual in finding a suitable home.</p>

        <p>Best regards,<br>Home Finder Team</p>`
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
