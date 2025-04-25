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

  // Method to send the email
  async sendReminder(to: string, name_meta: string) {
    const subject = `⏳ ¡No olvides registrar tu aporte en "${name_meta}"!`;

    const html = `
      <p>¡Hola!</p>
      <p>Queremos recordarte que tienes una meta activa llamada <strong>"${name_meta}"</strong>, y aún no has registrado un nuevo aporte.</p>
      <p>🎯 Cada paso cuenta, y tú estás más cerca de lograrlo. ¡No dejes que el impulso se detenga!</p>
      <p>Haz clic en el siguiente enlace para registrar tu aporte ahora:</p>
      <p>
        <a href="${process.env.URL_REGISTER}" style="padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">
          Registrar aporte
        </a>
      </p>
      <p>¡Tú puedes lograrlo! 💪</p>
      <p>— El equipo de Finanzas Inteligentes</p>
    `;

    const text = `Tienes una meta activa: "${name_meta}". No olvides registrar tu aporte aquí: ${process.env.URL_REGISTER}`;

    await this.sendMail(to, subject, text, html);
  }
}
