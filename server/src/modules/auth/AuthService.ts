import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import OauthUser from '../user/domain/OauthUser';
import SigninRequest from '../user/dto/request/SigninRequest';
import SSOSignupRequest from '../user/dto/request/SSOSigninRequest';
import SigninResponse from '../user/dto/response/SigninResponse';
import OauthType from '../user/enum/OauthType';
import { UserRepository } from '../user/UserRepository';
import VerifyResponse from './dto/response/VerifyResponse';
import BasicUser from '../user/domain/BasicUser';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async signin(request: SigninRequest) {
    const user = await this.userRepository.findUserByEmail(request.email);
    if (!user) {
      throw new UnauthorizedException('이메일 혹은 패스워드가 잘못되었습니다.');
    }
    user.authenticate(request.password);
    return new SigninResponse(user);
  }

  public async signinByOauth(request: SSOSignupRequest) {
    const loggedinUser = await this.userRepository.findUserByOauth(request.oauthId, OauthType[request.oauthType]);
    if (loggedinUser) {
      return new SigninResponse(loggedinUser);
    }
    const newUser = OauthUser.new(OauthType[request.oauthType], request.oauthId);
    await this.userRepository.save(newUser);
    return new SigninResponse(newUser);
  }

  public issueJwtAccessToken(userId: number) {
    const payload = { userId };
    return this.jwtService.sign(payload, {
      expiresIn: '1h',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  public issueVerifyToken(userId: number, email: string, type: string) {
    const payload = { userId, email, type };
    return this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  public async verify(token: string) {
    const verifyResult = this.jwtService.verify<{ userId: number; email: string; type: string }>(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    if (!verifyResult) {
      throw new BadRequestException('INVALID_TOKEN');
    }

    const user = await this.userRepository.findUserByEmail(verifyResult.email);

    if (Number(user.userId) !== verifyResult.userId) {
      throw new BadRequestException('INCORRECT_USER_INFO');
    }

    user.isApproved = true;

    const updatedUser = await this.userRepository.save(user);

    return new VerifyResponse(updatedUser as BasicUser);
  }
}
