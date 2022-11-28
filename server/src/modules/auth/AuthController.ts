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
import SignupResponse from '../user/dto/response/SignupResponse';
import { ApiExcludeEndpoint, ApiExtraModels, ApiOkResponse } from '@nestjs/swagger';
import SigninResponse from '../user/dto/response/SigninResponse';
import { MailService } from '../common/MailService';
import { ApiSingleResponse } from 'src/decorators/ApiResponseDecorator';

@Controller('auth')
@ApiExtraModels(ApiResponse, SigninResponse, SignupResponse)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @Post('signup')
  @ApiSingleResponse(201, SignupResponse, '회원가입 완료')
  async signup(@Body() request: SignupRequest) {
    const response = await this.userService.signupBasicUser(request);
    const verifyToken = this.authService.issueVerifyToken(response.userId, request.email, 'SIGNUP');
    this.mailService.sendVerifyMail(request.email, verifyToken);
    return new ApiResponse('signup 완료', response);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    const verifyResult = await this.authService.verify(token);

    return new ApiResponse('verify status', verifyResult);
  }

  @Post('signin')
  @ApiSingleResponse(200, SigninResponse, '로그인 완료')
  async signin(@Body() request: SigninRequest, @Res() response: Response) {
    const user = await this.authService.signin(request);
    const token = this.authService.issueJwtAccessToken(user.userId);
    response.cookie('accessToken', token);
    return response.status(200).json(new ApiResponse('signin 완료', user));
  }

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  @ApiOkResponse({
    description: '카카오 로그인',
  })
  kakaoLogin() {
    return 'OK';
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  @ApiExcludeEndpoint()
  async kakaoSignup(@User('id') oauthId: string, @Res() res: Response) {
    const ApiResponse = await this.oauthCallback(oauthId, OauthType['KAKAO'], res);
    return res.status(200).json(ApiResponse);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOkResponse({
    description: '구글 로그인',
  })
  googleLogin() {
    return 'OK';
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiExcludeEndpoint()
  async googleAuthCallback(@User('id') oauthId: string, @Res() res: Response) {
    const ApiResponse = await this.oauthCallback(oauthId, OauthType['GOOGLE'], res);
    return res.status(200).json(ApiResponse);
  }

  @Get('github')
  @UseGuards(AuthGuard('github'))
  @ApiOkResponse({
    description: '깃헙 로그인',
  })
  githubLogin() {
    return 'OK';
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  @ApiExcludeEndpoint()
  async githubAuthCallback(@User('id') oauthId: string, @Res() res: Response) {
    const ApiResponse = await this.oauthCallback(oauthId, OauthType['GITHUB'], res);
    return res.status(200).json(ApiResponse);
  }

  @Get('naver')
  @UseGuards(AuthGuard('naver'))
  @ApiOkResponse({
    description: '네이버 로그인',
  })
  naverLogin() {
    return 'OK';
  }

  @Get('naver/callback')
  @UseGuards(AuthGuard('naver'))
  @ApiExcludeEndpoint()
  async naverSignup(@User('id') oauthId: string, @Res() res: Response) {
    const ApiResponse = await this.oauthCallback(oauthId, OauthType['NAVER'], res);
    return res.status(200).json(ApiResponse);
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
