import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    // Configuration for the SMTP server connection
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // You can change the service to 'sendgrid', 'hotmail', etc.
      auth: {
        user: process.env.EMAIL_ADDRES, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });
  }

  // Method to send the email
  async sendMail(to: string, subject: string, text: string, html?: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `<${process.env.EMAIL_ADDRES}>`,
        to, // Recipient
        subject, // Subject
        text, // Plain text content
        html, // HTML content (optional)
      });
      console.log('Email sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email', error);
    }
  }
}
