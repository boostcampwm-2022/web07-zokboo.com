import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import { Request, response, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/UserService';
import ApiResponse from '../common/response/ApiResponse';
import SignupRequest from '../user/dto/request/SignupRequest';
import SigninRequest from '../user/dto/request/SigninRequest';
import { JwtAuthGuard } from './guard/jwtAuthGuard';

@Controller('auth')
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
    return response.status(200);
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
