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
import SigninRequest from '../../src/modules/user/dto/request/SigninRequest';
import ResetTokenRequest from '../../src/modules/auth/dto/request/ResetTokenRequest';
import ResetPasswordRequest from '../../src/modules/auth/dto/request/ResetPasswordRequest';
import { PrismaInstance } from '../../src/modules/common/PrismaInstance';
import { MockInstance } from '../MockInstance';

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
    })
      .overrideProvider(PrismaInstance)
      .useClass(MockInstance)
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
    userService = moduleRef.get<UserService>(UserService);
    mailService = moduleRef.get<MailService>(MailService);
  });

  describe('signup', () => {
    it('??????', (done) => {
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
          msg: 'signup ??????',
          data: {
            userId: 1,
          },
        }),
      );
      done();
    });

    it('?????? - ????????? Body??? ??????????????? ??????', async () => {
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
    it('??????', (done) => {
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

    it('?????? - ????????? ????????? ????????? ??????', async () => {
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
    it('??????', (done) => {
      // TODO: ????????? ????????? ??????
      done();
    });
  });

  describe('signin', () => {
    it('??????', async () => {
      jest.spyOn(authService, 'signin').mockResolvedValue({ userId: 1, nickname: 'test', avatar: 'test' });
      jest.spyOn(authService, 'issueJwtAccessToken').mockReturnValue('token');

      const mockResponse = {
        status: (code) => {
          mockResponse.statusCode = code;
          return mockResponse;
        },
        json: (data) => {
          return mockResponse;
        },
        cookie: (name, val, options) => {
          return mockResponse;
        },
      } as Response;

      const request = new SigninRequest();
      request.email = 'test@test.com';
      request.password = 'test';

      authController
        .signin(request, mockResponse)
        .then((result) => {
          expect(result.statusCode).toBe(200);
        })
        .catch((err) => {
          console.log(err);
          fail(err);
        });
    });

    it('?????? - ????????? ????????? ????????? ??????', async () => {
      const wrongRequestList: SigninRequest[] = [
        {
          email: 'test@email.com',
          password: null,
        },
        {
          email: null,
          password: 'test',
        },
        {
          email: null,
          password: null,
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

  describe('resetPasswordRequest', () => {
    it('??????', async () => {
      jest.spyOn(authService, 'issueResetToken').mockReturnValue('token');
      jest.spyOn(mailService, 'sendResetMail').mockResolvedValue(null);

      const request: ResetTokenRequest = { email: 'test@email.com' };

      try {
        const result = await authController.resetPasswordRequest(request);

        expect(result).toEqual({ msg: '???????????? ????????? ?????? ??????', data: { token: 'token' } });
      } catch (e) {
        fail(e);
      }
    });

    it('?????? - email ??????', async () => {
      const request: ResetTokenRequest = {
        email: null,
      };

      try {
        const result = await validate(request, { whitelist: true, forbidNonWhitelisted: true });
        expect(result.length).toBeGreaterThan(0);
      } catch (e) {
        fail(e);
      }
    });
  });

  describe('resetPassword', () => {
    it('??????', async () => {
      jest.spyOn(authService, 'resetPassword').mockResolvedValue({ userId: 1 });

      const request: ResetPasswordRequest = {
        token: 'test',
        password: 'test',
        passwordConfirmation: 'test',
      };

      try {
        const result = await authController.resetPassword(request);

        expect(result).toEqual({ msg: '???????????? ????????? ??????', data: { userId: 1 } });
      } catch (e) {
        fail(e);
      }
    });

    it('?????? - ????????? Body', async () => {
      const wrongRequestList: ResetPasswordRequest[] = [
        {
          token: null,
          password: 'test',
          passwordConfirmation: 'test',
        },
        {
          token: 'test',
          password: null,
          passwordConfirmation: 'test',
        },
        {
          token: 'test',
          password: 'test',
          passwordConfirmation: null,
        },
        {
          token: 'test',
          password: null,
          passwordConfirmation: null,
        },
        {
          token: null,
          password: 'test',
          passwordConfirmation: null,
        },
        {
          token: null,
          password: null,
          passwordConfirmation: 'test',
        },
        {
          token: null,
          password: null,
          passwordConfirmation: null,
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

  describe('??? SSO ?????? ?????????', () => {
    it('??????', (done) => {
      expect(authController.naverLogin()).toEqual('OK');
      expect(authController.googleLogin()).toEqual('OK');
      expect(authController.kakaoLogin()).toEqual('OK');
      expect(authController.githubLogin()).toEqual('OK');

      done();
    });
  });

  describe('SSO callback test (?????? ????????? ????????? ??????????????? ?????? ????????? ??????)', () => {
    it('??????', async () => {
      jest.spyOn(authService, 'signinByOauth').mockResolvedValue({ userId: 1, nickname: 'test', avatar: 'test' });
      jest.spyOn(authService, 'issueJwtAccessToken').mockReturnValue('token');

      const mockResponse = {
        cookie: (name, val, options) => {
          return mockResponse;
        },
        status: (code) => {
          mockResponse.statusCode = code;
          return mockResponse;
        },
        json: (data) => {
          return mockResponse;
        },
      } as Response<any>;

      try {
        const naverResult = await authController.naverSignup('1', mockResponse);
        const githubResult = await authController.githubAuthCallback('1', mockResponse);
        const kakaoResult = await authController.kakaoSignup(1, mockResponse);
        const googleResult = await authController.googleAuthCallback('1', mockResponse);

        expect(naverResult.statusCode).toEqual(200);
        expect(githubResult.statusCode).toEqual(200);
        expect(kakaoResult.statusCode).toEqual(200);
        expect(googleResult.statusCode).toEqual(200);
      } catch (e) {
        console.log(e);
        fail(e);
      }
    });
  });
});
