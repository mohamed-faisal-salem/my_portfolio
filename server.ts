
/**
 * BACKEND SERVER (Node.js/Express)
 * This file contains the logic for the backend.
 * In a real-world deployment, this would be a separate project.
 * It uses Express and Nodemailer to handle the Contact Form.
 */

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const app = express();
app.use(cors());
app.use(express.json());

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Configure transporter (Update with real credentials for production)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: email,
      to: 'engmohamedfaisal06@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      text: `From: ${name} (${email})\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// (Mocked instructions: Deploy this file as a standalone Node.js server to handle real form submissions.)
