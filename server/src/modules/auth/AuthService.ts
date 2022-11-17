import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import OauthUser from '../user/domain/OauthUser';
import SigninRequest from '../user/dto/request/SigninRequest';
import SSOSignupRequest from '../user/dto/request/SSOSigninRequest';
import SigninResponse from '../user/dto/response/SigninResponse';
import OauthType from '../user/enum/OauthType';
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

  async signinByOauth(request: SSOSignupRequest) {
    const loggedinUser = await this.userRepository.findUserByOauth(request.oauthId, OauthType[request.oauthType]);
    if (loggedinUser) {
      return new SigninResponse(loggedinUser);
    }
    const newUser = OauthUser.new(OauthType[request.oauthType], request.oauthId);
    await this.userRepository.save(newUser);
    return new SigninResponse(newUser);
  }

  signupKakao(name: string, email: string, id: string) {
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
