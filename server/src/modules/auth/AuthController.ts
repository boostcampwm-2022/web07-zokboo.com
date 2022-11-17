import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/UserService';
import ApiResponse from '../common/response/ApiResponse';
import SignupRequest from '../user/dto/request/SignupRequest';
import SSOSignupRequest from '../user/dto/request/SSOSignupRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @Post('signup')
  async signup(@Body() request: SignupRequest) {
    const response = await this.userService.signupBasicUser(request);
    return new ApiResponse('signup 완료', response);
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    return 'OK';
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  kakaoSignup(@Req() req: Request) {
    return new ApiResponse('kakao data loading success', req.user);
  }

  @Post('signup/sso')
  async ssoSignup(@Body() request: SSOSignupRequest) {
    const response = await this.userService.signupOAuthUser(request);
    return new ApiResponse('signup 완료', response);
  }
}
