import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('GITHUB_APPLICATION_ID'),
      clientSecret: configService.get<string>('GITHUB_APPLICATION_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
    });
  }

  validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name } = profile;

    return {
      provider: 'GITHUB',
      id,
      name,
    };
  }
}
