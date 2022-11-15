import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/')
  test() {
    return 'hehe';
  }

  @Get('/oauth/kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    return 'OK';
  }

  @Get('/oauth/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoSignup(@Req() req: Request) {
    console.log(req.user);
  }
}
