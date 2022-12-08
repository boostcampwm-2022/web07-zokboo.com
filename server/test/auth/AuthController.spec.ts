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

describe('AuthController Test', () => {
  let authController: AuthController;
  let authService: AuthService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
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
  });

  describe('a', () => {
    it('b', (done) => {
      done();
    });
  });
});
