import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import SigninRequest from '../user/dto/request/SigninRequest';
import SigninResponse from '../user/dto/response/SigninResponse';
import { UserRepository } from '../user/UserRepository';
import { AuthRepository } from './AuthRepository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  getUserById(id: number) {
    return this.authRepository.getById(id);
  }

  async signin(request: SigninRequest) {
    const user = await this.userRepository.findUserByEmail(request.email);
    user.authenticate(request.password);
    return new SigninResponse(user);
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

    //const user = this.authRepository.create(oauthData, email);
  }

  issueJwtAccessToken(userId: number) {
    const payload = { userId };
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }
}
