import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GOOGLE_APPLICATION_ID'),
      clientSecret: configService.get<string>('GOOGLE_APPLICATION_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name } = profile;

    return {
      provider: 'GOOGLE',
      id,
      name,
    };
  }
}
