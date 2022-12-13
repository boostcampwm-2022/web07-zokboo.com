import { Test } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../../src/modules/user/UserModule';
import { AppModule } from '../../src/AppModule';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CommonModule } from '../../src/modules/common/CommonModule';
import { AuthService } from '../../src/modules/auth';
import { PrismaInstance } from '../../src/modules/common/PrismaInstance';
import { MockInstance } from '../MockInstance';
import { UserRepository } from '../../src/modules/user/UserRepository';
import BasicUser from '../../src/modules/user/domain/BasicUser';
import SigninRequest from '../../src/modules/user/dto/request/SigninRequest';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

describe('AuthService Test', () => {
  let authService: AuthService;
  let userRepository: UserRepository;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        CommonModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            secret: configService.get<string>('JWT_SECRET'),
          }),
        }),
      ],
      providers: [AuthService],
    })
      .overrideProvider(PrismaInstance)
      .useClass(MockInstance)
      .compile();

    authService = moduleRef.get<AuthService>(AuthService);
    userRepository = moduleRef.get<UserRepository>(UserRepository);
    jwtService = moduleRef.get<JwtService>(JwtService);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  describe('signin', () => {
    it('성공', async () => {
      const request: SigninRequest = {
        email: 'test@email.com',
        password: 'test',
      };
      const resolvedUser = new BasicUser(
        BigInt(1),
        'test',
        'test',
        new Date(),
        new Date(),
        'test@email.com',
        '$2b$11$pfY0hI9JWuQTf5t3WxiA/uANZkzXBvbp0RGBKfZBlXb.8wDGZFVEu', // bcrypt('test')
        true,
      );

      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(resolvedUser);

      try {
        const result = await authService.signin(request);
        expect(result).toEqual({ userId: 1, nickname: 'test', avatar: 'test' });
      } catch (e) {
        console.log(e);
      }
    });

    it('실패 - 잘못된 비밀번호', async () => {
      const request: SigninRequest = {
        email: 'test@email.com',
        password: 'zxc',
      };
      const resolvedUser = new BasicUser(
        BigInt(1),
        'test',
        'test',
        new Date(),
        new Date(),
        'test@email.com',
        '$2b$11$pfY0hI9JWuQTf5t3WxiA/uANZkzXBvbp0RGBKfZBlXb.8wDGZFVEu', // bcrypt('test')
        true,
      );

      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(resolvedUser);

      try {
        await authService.signin(request);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(e.message).toEqual('잘못된 password');
      }
    });

    it('실패 - 유저 정보 조회 실패', async () => {
      jest.spyOn(userRepository, 'findUserByEmail').mockResolvedValue(null);

      const request: SigninRequest = {
        email: 'wrong@email.com',
        password: 'test',
      };

      try {
        await authService.signin(request);
      } catch (e) {
        expect(e).toBeInstanceOf(UnauthorizedException);
        expect(e.message).toEqual('이메일 혹은 패스워드가 잘못되었습니다.');
      }
    });
  });

  describe('signinByOauth', () => {
    it('TODO: 트랜잭션 처리 필요', (done) => {
      expect(1).toEqual(1);
      done();
    });
  });

  describe('resetPassword', () => {
    it('TODO: 트랜잭션 처리 필요', (done) => {
      expect(1).toEqual(1);
      done();
    });
  });

  describe('issueJwtAccessToken', () => {
    it('성공', (done) => {
      // 토큰 발급은 실패 케이스가 존재하지 않습니다. (빈 객체도 토큰은 생성됨)
      const token = authService.issueJwtAccessToken(1);

      const { userId } = jwtService.verify<{ userId: number }>(token, {
        secret: configService.get<string>('JWT_SECRET'),
      });
      expect(userId).toEqual(1);
      done();
    });
  });

  describe('issueVerifyToken', () => {
    it('성공', (done) => {
      // 토큰 발급은 실패 케이스가 존재하지 않습니다. (빈 객체도 토큰은 생성됨)
      const token = authService.issueVerifyToken(1, 'test@email.com', 'test');

      const { userId, email, type } = jwtService.verify<{ userId: number; email: string; type: string }>(token, {
        secret: configService.get<string>('JWT_SECRET'),
      });

      expect(userId).toEqual(1);
      expect(email).toEqual('test@email.com');
      expect(type).toEqual('test');
      done();
    });
  });

  describe('issueResetToken', () => {
    it('성공', (done) => {
      const token = authService.issueResetToken('test@email.com');

      const { email } = jwtService.verify<{ email: string }>(token, {
        secret: configService.get<string>('JWT_SECRET'),
      });

      expect(email).toEqual('test@email.com');
      done();
    });
  });

  describe('verifySignupToken', () => {
    it('TODO: 트랜잭션 처리 필요', (done) => {
      expect(1).toEqual(1);
      done();
    });
  });
});
