import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport } from 'nodemailer';

interface ISendMailParams {
  to: string;
  subject: string;
  description: string;
}

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

  public sendMail({ to, subject, description }: ISendMailParams) {
    try {
      return this.transporter.sendMail({
        from: this.configService.get<string>('SMTP_ADDRESS'),
        to,
        subject,
        html: description,
      });
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('메일 전송에 실패했습니다. 계정 상황을 확인해주세요.');
    }
  }
}
