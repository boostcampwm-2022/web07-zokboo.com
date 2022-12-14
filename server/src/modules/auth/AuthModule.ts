import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/UserModule';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { ConfigService } from '@nestjs/config';
import { KakaoStrategy, JwtStrategy, NaverStrategy } from './strategies';
import { CommonModule } from '../common/CommonModule';
import { GoogleStrategy } from './strategies/GoogleStrategy';
import { GithubStrategy } from './strategies/GithubStrategy';

@Module({
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
})
export class AuthModule {}
