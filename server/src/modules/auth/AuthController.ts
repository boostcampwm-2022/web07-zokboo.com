import { Body, Controller, Post } from '@nestjs/common';
import ApiResponse from '../common/response/ApiResponse';
import SignupRequest from '../user/dto/request/SignupRequest';
import { UserService } from '../user/UserService';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signup(@Body() request: SignupRequest) {
    const response = await this.userService.signupBasicUser(request);
    return new ApiResponse('signup 완료', response);
  }
}
