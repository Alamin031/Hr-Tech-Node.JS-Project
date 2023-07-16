import nodemailer from 'nodemailer';

export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configure the transporter with your email provider's settings
    this.transporter = nodemailer.createTransport({
      service: 'your-email-provider',
      auth: {
        user: 'your-email@example.com',
        pass: 'your-password',
      },
    });
  }

  public sendRegistrationEmail(to: string, username: string): Promise<void> {
    const mailOptions = {
      from: 'your-email@example.com',
      to: to,
      subject: 'Welcome to our website',
      text: `Hello ${username}, welcome to our website!`,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
