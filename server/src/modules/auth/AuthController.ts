import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/UserService';
import ApiResponse from '../common/response/ApiResponse';
import SignupRequest from '../user/dto/request/SignupRequest';
import SigninRequest from '../user/dto/request/SigninRequest';
import { JwtAuthGuard } from './guard/jwtAuthGuard';
import SSOSignupRequest from '../user/dto/request/SSOSignupRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UserService) {}

  @Post('signup')
  async signup(@Body() request: SignupRequest) {
    const response = await this.userService.signupBasicUser(request);
    return new ApiResponse('signup 완료', response);
  }

  @Post('signin')
  async signin(@Body() request: SigninRequest, @Res() response: Response) {
    const user = await this.authService.signin(request);
    const token = this.authService.issueJwtAccessToken(user.userId);
    response.cookie('accessToken', token);
    return response.status(200).json(new ApiResponse('signin 완료', user));
    //return new ApiResponse('signin 완료', user);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  testLogin() {
    return new ApiResponse('로그인 된 사용자입니다.');
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    return 'OK';
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoSignup(@Req() req: Request) {
    const { id } = req.user;

    const response = await this.userService.signupOAuthUser({ oauthType: 'KAKAO', oauthId: id });
    return new ApiResponse('kakao data loading success', response);
  }
}
