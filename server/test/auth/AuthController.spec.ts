import { AuthController, AuthService } from '../../src/modules/auth';
import { Test } from '@nestjs/testing';
import { UserModule } from '../../src/modules/user/UserModule';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '../../src/modules/common/CommonModule';
import { JwtStrategy, KakaoStrategy, NaverStrategy } from '../../src/modules/auth/strategies';
import { GoogleStrategy } from '../../src/modules/auth/strategies/GoogleStrategy';
import { GithubStrategy } from '../../src/modules/auth/strategies/GithubStrategy';
import { AppModule } from '../../src/AppModule';
import { UserService } from '../../src/modules/user/UserService';
import SignupResponse from '../../src/modules/user/dto/response/SignupResponse';
import User from '../../src/modules/user/domain/User';
import { MailService } from '../../src/modules/common/MailService';
import SignupRequest from '../../src/modules/user/dto/request/SignupRequest';
import { validate } from 'class-validator';
import VerifyResponse from '../../src/modules/auth/dto/response/VerifyResponse';
import BasicUser from '../../src/modules/user/domain/BasicUser';
import { BadRequestException } from '@nestjs/common';
import { Response } from 'express';

describe('AuthController Test', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;
  let mailService: MailService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
          }),
        }),
        CommonModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, JwtStrategy, KakaoStrategy, GoogleStrategy, NaverStrategy, GithubStrategy],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    mailService = moduleRef.get<MailService>(MailService);
  });

  describe('signup', () => {
    it('성공', (done) => {
      const signupRequest: SignupRequest = {
        email: 'test',
        password: 'test',
        passwordConfirmation: 'test',
        nickname: 'test',
      };
      const user = new User(BigInt(1), 'test', 'test', new Date(), new Date());
      jest.spyOn(userService, 'signupBasicUser').mockResolvedValue(new SignupResponse(user));
      jest.spyOn(authService, 'issueVerifyToken').mockReturnValue('token success');
      jest.spyOn(mailService, 'sendVerifyMail').mockResolvedValue(null);

      authController.signup(signupRequest).then((result) =>
        expect(result).toEqual({
          msg: 'signup 성공',
          data: {
            userId: 1,
          },
        }),
      );
      done();
    });

    it('실패 - 잘못된 Body가 입력되었을 경우', async () => {
      const wrongRequestList: SignupRequest[] = [
        {
          email: 'test',
          password: 'test',
          passwordConfirmation: 'test',
          nickname: null,
        },
        {
          email: 'test',
          password: 'test',
          passwordConfirmation: null,
          nickname: 'test',
        },
        {
          email: 'test',
          password: null,
          passwordConfirmation: 'test',
          nickname: 'test',
        },
        {
          email: null,
          password: 'test',
          passwordConfirmation: 'test',
          nickname: 'test',
        },
      ];

      try {
        for (const request of wrongRequestList) {
          const result = await validate(request, { whitelist: true, forbidNonWhitelisted: true });

          expect(result.length).toBeGreaterThan(0);
        }
      } catch (e) {
        fail(e);
      }
    });
  });

  describe('verify', () => {
    it('성공', (done) => {
      const basicUser = new BasicUser(BigInt(1), 'test', 'test', new Date(), new Date(), 'test', 'test', true);
      const token = 'token';
      jest.spyOn(authService, 'verifySignupToken').mockResolvedValue(new VerifyResponse(basicUser));

      authController.verify(token).then((result) => {
        expect(result).toEqual({
          msg: 'verify status',
          data: {
            userId: 1,
            status: true,
          },
        });
      });

      done();
    });

    it('실패 - 잘못된 토큰을 넘겼을 경우', async () => {
      const token = '';
      jest.spyOn(authService, 'verifySignupToken').mockRejectedValue(new BadRequestException('INVALID_TOKEN'));

      try {
        await authController.verify(token);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('logout', () => {
    it('성공', (done) => {
      done();
    });
  });
});
