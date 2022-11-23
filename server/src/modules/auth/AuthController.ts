import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/UserService';
import ApiResponse from '../common/response/ApiResponse';
import SignupRequest from '../user/dto/request/SignupRequest';
import SigninRequest from '../user/dto/request/SigninRequest';
import SSOSigninRequest from '../user/dto/request/SSOSigninRequest';
import OauthType from '../user/enum/OauthType';
import { User } from 'src/decorators/UserDecorator';
import { Response } from 'express';

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

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  kakaoLogin() {
    return 'OK';
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoSignup(@User('id') oauthId: string, @Res() res: Response) {
    const apiResponse = await this.oauthCallback(oauthId, OauthType['KAKAO'], res);
    return res.status(200).json(apiResponse);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    return 'OK';
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@User('id') oauthId: string, @Res() res: Response) {
    const apiResponse = await this.oauthCallback(oauthId, OauthType['GOOGLE'], res);
    return res.status(200).json(apiResponse);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubLogin() {
    return 'OK';
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@User('id') oauthId: string, @Res() res: Response) {
    const apiResponse = await this.oauthCallback(oauthId, OauthType['GITHUB'], res);
    return res.status(200).json(apiResponse);
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  naverLogin() {
    return 'OK';
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  async naverSignup(@User('id') oauthId: string, @Res() res: Response) {
    const apiResponse = await this.oauthCallback(oauthId, OauthType['NAVER'], res);
    return res.status(200).json(apiResponse);
  }

  private async oauthCallback(oauthId: string, oauthType: string, res: Response) {
    const oauthRequest: SSOSigninRequest = {
      oauthId,
      oauthType,
    };
    const user = await this.authService.signinByOauth(oauthRequest);
    const token = this.authService.issueJwtAccessToken(user.userId);
    res.cookie('accessToken', token);
    return new ApiResponse('signin 완료', user);
  }
}
