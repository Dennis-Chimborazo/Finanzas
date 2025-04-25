import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import path from 'path';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import { ContributionPdfDTO } from 'src/contribution/dto/contribution.pdf.dto';

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

  // Schedule reminder dynamically - sends an email every 2 minutes
  scheduleReminder(to: string, nameMeta: string) {
    const sevenDays = 1000 * 60 * 60 * 24 * 7; // 7 days in milliseconds

    // Send the first reminder immediately (or on a condition)
    this.sendReminder(to, nameMeta);

    // Set interval every 2 minutes for reminders
    setInterval(() => {
      this.sendReminder(to, nameMeta);
    }, sevenDays);
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




  async generatePdfFromContributions(data: ContributionPdfDTO[], fileName: string): Promise<string> {
    const htmlTableRows = data.map(item => `
    <tr>
      <td>${item.goal_name}</td>
      <td>$${item.amount.toFixed(2)}</td>
      <td>${new Date(item.contribution_date).toLocaleString()}</td>
    </tr>
  `).join('');

    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 2rem;
          }
          h2 {
            color: #4CAF50;
            text-align: center;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #dddddd;
            padding: 8px;
            text-align: center;
          }
          th {
            background-color: #f2f2f2;
            color: #333;
          }
        </style>
      </head>
      <body>
        <h2>📋 Reporte de Aportes</h2>
        <table>
          <thead>
            <tr>
              <th>Meta</th>
              <th>Monto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            ${htmlTableRows}
          </tbody>
        </table>
      </body>
    </html>
  `;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const filePath = path.resolve(__dirname, fileName);
    await page.pdf({ path: filePath, format: 'A4' });

    await browser.close();
    return filePath;
  }

  async sendContributionReport(to: string, data: ContributionPdfDTO[]) {
    const pdfPath = await this.generatePdfFromContributions(data, 'aporte-reporte.pdf');
  
    const mailOptions = {
      from: `<${process.env.EMAIL_ADDRES}>`,
      to,
      subject: '📄 Tu reporte de aportes',
      text: 'Adjunto encontrarás un resumen en PDF con tus aportes registrados.',
      attachments: [
        {
          filename: 'aporte-reporte.pdf',
          path: pdfPath,
        },
      ],
    };
  
    await this.transporter.sendMail(mailOptions);
    fs.unlinkSync(pdfPath); // Eliminar archivo temporal
  }
  
}
