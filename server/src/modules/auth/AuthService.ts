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
import ResetPasswordRequest from './dto/request/ResetPasswordRequest';
import ResetPasswordResponse from './dto/response/ResetPasswordResponse';
import { PrismaInstance } from '../common/PrismaInstance';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaInstance,
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
    let result: SigninResponse;
    await this.prisma.$transaction(async (tx) => {
      const loggedinUser = await this.userRepository.findUserByOauth(request.oauthId, OauthType[request.oauthType], tx);
      if (loggedinUser) {
        result = new SigninResponse(loggedinUser);
        return;
      }
      const newUser = OauthUser.new(OauthType[request.oauthType], request.oauthId);
      await this.userRepository.save(newUser, tx);
      result = new SigninResponse(newUser);
    });
    return result;
  }

  public async resetPassword(request: ResetPasswordRequest) {
    let result: ResetPasswordResponse;
    await this.prisma.$transaction(async (tx) => {
      const verifyResult = this.jwtService.verify<{ email: string }>(request.token);

      if (!verifyResult) {
        throw new BadRequestException('INVALID_TOKEN');
      }

      const user = await this.userRepository.findUserByEmail(verifyResult.email, tx);

      user.updatePassword(request.password, request.passwordConfirmation);

      const savedUser = await this.userRepository.save(user, tx);

      result = new ResetPasswordResponse(savedUser);
    });
    return result;
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

  public issueResetToken(email: string) {
    const payload = { email };
    return this.jwtService.sign(payload, {
      expiresIn: '30m',
      secret: this.configService.get<string>('JWT_SECRET'),
    });
  }

  public async verifySignupToken(token: string) {
    let result: VerifyResponse;
    await this.prisma.$transaction(async (tx) => {
      const verifyResult = this.jwtService.verify<{ userId: number; email: string; type: string }>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (!verifyResult) {
        throw new BadRequestException('INVALID_TOKEN');
      }

      const user = await this.userRepository.findUserByEmail(verifyResult.email, tx);

      if (Number(user.userId) !== verifyResult.userId) {
        throw new BadRequestException('INCORRECT_USER_INFO');
      }

      user.setApproved();

      const updatedUser = await this.userRepository.save(user, tx);

      result = new VerifyResponse(updatedUser as BasicUser);
    });
    return result;
  }
}
