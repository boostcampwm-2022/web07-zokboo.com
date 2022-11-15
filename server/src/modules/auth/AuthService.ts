import { ConflictException, Injectable } from '@nestjs/common';
import { AuthRepository } from './AuthRepository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  getUserById(id: number) {
    return this.authRepository.getById(id);
  }

  signupKakao(name: string, email: string, id: number) {
    const oauthData = {
      oauth_id: id,
      oauth_type: 'kakao',
    };

    const exists = this.authRepository.getByOAuthId(id);

    if (exists) {
      throw new ConflictException();
    }

    const user = this.authRepository.create(oauthData, email);
  }
}
