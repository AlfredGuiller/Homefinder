import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fname, lname, number, email, selectedDate } = req.body;

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
        subject: 'New Visit Tour Request',
        html: `
        <h1>New Visit Tour Request</h1>
        <p>You have received a new visit tour request:</p>

        <h2>Contact Details:</h2>
        <p><strong>Name:</strong> ${fname} ${lname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${number}</p>

        <h2>Selected Date:</h2>
        <h3>${selectedDate}</h3>

        <p>Please contact the individual to confirm the visit tour.</p>

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
