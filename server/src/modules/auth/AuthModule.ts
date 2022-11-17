import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/UserModule';
import { AuthController } from './AuthController';
import { AuthService } from './AuthService';
import { AuthRepository } from './AuthRepository';
import { ConfigService } from '@nestjs/config';
import { KakaoStrategy, JwtStrategy } from './strategies';
import { CommonModule } from '../common/CommonModule';

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
  providers: [AuthService, AuthRepository, JwtStrategy, KakaoStrategy],
})
export class AuthModule {}
