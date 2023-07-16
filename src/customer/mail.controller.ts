import { Request, Response } from 'express';
import { MailService } from './mail.service';

export class MailController {
  private mailService: MailService;

  constructor() {
    this.mailService = new MailService();
  }

  public sendRegistrationEmail(req: Request, res: Response): void {
    const { to, username } = req.body;

    this.mailService
      .sendRegistrationEmail(to, username)
      .then(() => {
        res.status(200).json({ message: 'Email sent successfully' });
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to send email' });
      });
  }
}
