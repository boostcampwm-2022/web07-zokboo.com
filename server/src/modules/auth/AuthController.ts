import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
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
import { MailService } from '../common/MailService';

const VERIFY_TOKEN_TEMPLATE = (url) => `<!DOCTYPE HTML>
<html lang="ko">
<head>
  <title>족부닷컴</title>
  <meta charset="utf-8">
</head>
<body>
<h1>족부닷컴</h1>
<p>
<div>회원가입이 완료되었습니다. 링크를 클릭해 계정 인증을 완료해주세요! 제공되는 링크는 회원가입 시점으로부터 30분간 유효합니다.</div>
<div>
  <a href="${url}" target="_blank">링크 클릭</a>
</div>
</p>
</body>
</html>`;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @Post('signup')
  async signup(@Body() request: SignupRequest) {
    const response = await this.userService.signupBasicUser(request);
    const verifyToken = this.authService.issueVerifyToken(response.userId, request.email, 'SIGNUP');
    const template = VERIFY_TOKEN_TEMPLATE(`http://localhost:3000/auth/verify?token=${verifyToken}`);
    await this.mailService.sendMail({
      to: request.email,
      subject: '[족부닷컴] 회원가입을 환영합니다! 계정 인증을 마무리해주세요.',
      description: template,
    });
    return new ApiResponse('signup 완료', response);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    const verifyResult = await this.authService.verify(token);

    return new ApiResponse('verify status', verifyResult);
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
