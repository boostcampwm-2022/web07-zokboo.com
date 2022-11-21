import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport({
      host: configService.get<string>('SMTP_HOST'),
      port: +configService.get<string>('SMTP_PORT'),
      secure: configService.get<boolean>('SMTP_IS_SECURE'),
      auth: {
        user: configService.get<string>('SMTP_USERNAME'),
        pass: configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  public sendMail(to: string, subject: string, description: string) {
    return;
  }
}
