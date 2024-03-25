import process from 'process';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { generateAttachments } from 'src/helpers/generateAttachments';
import { generateTemplate } from 'src/helpers/generateTemplate';
import { getHost } from 'src/helpers/getHost';

dotenv.config();

export class EmailService {
  private static transporter: nodemailer.Transporter;

  public static initialize() {
    try {
      EmailService.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
    } catch (error) {
      console.error('Error initializing email service');
      throw error;
    }
  }

  public static async sendPasswordResetEmail(email: string, token: string) {
    try {
      const host = getHost();
      const template = generateTemplate<{
        token: string;
        host: string;
      }>('passwordResetTemplate', { token, host });
      const attachments = generateAttachments([{ name: 'email_logo' }]);
      const info = await EmailService.transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Password Reset',
        html: template,
        attachments,
      });
      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  }
}
