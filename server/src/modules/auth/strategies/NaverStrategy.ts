import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('NAVER_APPLICATION_ID'),
      clientSecret: configService.get<string>('NAVER_APPLICATION_SECRET'),
      callbackURL: configService.get<string>('NAVER_CALLBACK_URL'),
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    const { email, nickname, id } = profile._json;

    return {
      provider: 'NAVER',
      nickname,
      email,
      id,
    };
  }
}
