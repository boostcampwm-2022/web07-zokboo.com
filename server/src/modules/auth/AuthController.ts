import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/UserService';
import ApiResponse from '../common/response/ApiResponse';
import SignupRequest from '../user/dto/request/SignupRequest';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @Get('/')
  test() {
    return 'hehe';
  }

  @Post('signup')
  async signup(@Body() request: SignupRequest) {
    const response = await this.userService.signupBasicUser(request);
    return new ApiResponse('signup 완료', response);
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
