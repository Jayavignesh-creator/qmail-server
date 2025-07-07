import nodemailer from "nodemailer";

// 🔐 Replace with your Zoho credentials and email
const EMAIL_USER = "hello@quberneu.com";
const EMAIL_PASS = "UCSJHpQQkDvc"; // Must be a Zoho App Password

// POST endpoint for contact form
export default async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Nodemailer transporter using Zoho SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true, // Use SSL
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Email contents
    const mailOptions = {
      from: `"${name}" <hello@quberneu.com>`,
      to: EMAIL_USER,
      subject: `Contact Form: Message from ${name}`,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ error: "Failed to send email." });
  }
};
