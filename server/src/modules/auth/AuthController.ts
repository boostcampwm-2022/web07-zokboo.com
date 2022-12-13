import { Body, Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './AuthService';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/UserService';
import ApiResponse from '../common/response/ApiResponse';
import SignupRequest from '../user/dto/request/SignupRequest';
import SigninRequest from '../user/dto/request/SigninRequest';
import SSOSigninRequest from '../user/dto/request/SSOSigninRequest';
import OauthType from '../user/enum/OauthType';
import { User } from '../../decorators/UserDecorator';
import { Response } from 'express';
import SignupResponse from '../user/dto/response/SignupResponse';
import { ApiExcludeEndpoint, ApiExtraModels, ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';
import SigninResponse from '../user/dto/response/SigninResponse';
import { MailService } from '../common/MailService';
import { ApiSingleResponse } from '../../decorators/ApiResponseDecorator';
import ResetPasswordRequest from './dto/request/ResetPasswordRequest';
import ResetTokenResponse from './dto/response/ResetTokenResponse';
import ResetPasswordResponse from './dto/response/ResetPasswordResponse';
import ResetTokenRequest from './dto/request/ResetTokenRequest';

@Controller('api/auth')
@ApiExtraModels(ApiResponse, SigninResponse, SignupResponse, ResetTokenResponse, ResetPasswordResponse)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
    private mailService: MailService,
  ) {}

  @Post('signup')
  @ApiSingleResponse(201, SignupResponse, '회원가입 성공')
  async signup(@Body() request: SignupRequest) {
    const response = await this.userService.signupBasicUser(request);
    const verifyToken = this.authService.issueVerifyToken(response.userId, request.email, 'SIGNUP');
    this.mailService.sendVerifyMail(request.email, verifyToken);
    return new ApiResponse('signup 성공', response);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    const verifyResult = await this.authService.verifySignupToken(token);

    return new ApiResponse('verify status', verifyResult);
  }

  @Get('logout')
  @ApiNoContentResponse({ description: '로그아웃 완료' })
  logout(@Res() res: Response) {
    res.clearCookie('accessToken');

    res.status(204).send();
  }

  @Post('signin')
  @ApiSingleResponse(200, SigninResponse, '로그인 성공')
  async signin(@Body() request: SigninRequest, @Res() response: Response) {
    const user = await this.authService.signin(request);
    const token = this.authService.issueJwtAccessToken(user.userId);
    response.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return response.status(200).json(new ApiResponse('signin 성공', user));
  }

  @Post('reset')
  @ApiSingleResponse(200, ResetTokenResponse, '패스워드 재설정 요청 성공')
  async resetPasswordRequest(@Body() request: ResetTokenRequest) {
    const token = this.authService.issueResetToken(request.email);
    this.mailService.sendResetMail(request.email, token);

    return new ApiResponse('패스워드 재설정 요청 성공', new ResetTokenResponse(token));
  }

  @Post('reset/password')
  @ApiSingleResponse(200, ResetPasswordResponse, '패스워드 재설정 성공')
  async resetPassword(@Body() request: ResetPasswordRequest) {
    const response = await this.authService.resetPassword(request);

    return new ApiResponse('패스워드 재설정 성공', response);
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
  async kakaoSignup(@User('id') oauthId: number, @Res() res: Response) {
    const ApiResponse = await this.oauthCallback(String(oauthId), OauthType['KAKAO'], res);
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
    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return new ApiResponse('signin 성공', user);
  }
}
