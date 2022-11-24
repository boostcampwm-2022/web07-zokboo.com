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
      port: configService.get<number>('SMTP_PORT'),
      secure: configService.get<boolean>('SMTP_IS_SECURE'),
      auth: {
        user: configService.get<string>('SMTP_USERNAME'),
        pass: configService.get<string>('SMTP_PASSWORD'),
      },
    });
  }

  private sendMail({ to, subject, description }: ISendMailParams) {
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

  public sendVerifyMail(to: string, token: string) {
    // TODO: 추후에 ejs, pug 형태로 템플릿을 관리하면 좋을 것 같습니다.
    const template = `<!DOCTYPE HTML>
<html lang="ko">
<head>
  <title>족부닷컴</title>
  <meta charset="utf-8">
</head>
<body>
<h1>족부닷컴</h1>
<p>
<div>회원가입이 완료되었습니다. 링크를 클릭해 계정 인증을 완료해주세요! 제공되는 링크는 회원가입 시점으로부터 30분간 유효합니다.</div>
<div>
  <a href="http://localhost:8080/auth/verify?token=${token}" target="_blank">링크 클릭</a>
</div>
</p>
</body>
</html>`;

    return this.sendMail({
      to,
      subject: '[족부닷컴] 회원가입을 환영합니다! 계정 인증을 마무리해주세요.',
      description: template,
    });
  }
}
