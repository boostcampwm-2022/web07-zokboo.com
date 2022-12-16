import { Controller, Get, Patch, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './UserService';
import { User } from '../../decorators/UserDecorator';
import ApiResponse from '../common/response/ApiResponse';
import { ApiExtraModels } from '@nestjs/swagger';
import SigninResponse from './dto/response/SigninResponse';
import { ApiSingleResponse } from '../../decorators/ApiResponseDecorator';
import { JwtAuthGuard } from '../auth/guard/jwtAuthGuard';
import MyDataResponse from './dto/response/MyDataResponse';

@Controller('users')
@ApiExtraModels(SigninResponse, MyDataResponse)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('my')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, MyDataResponse, '내 정보 조회 성공')
  async getMyData(@User('id') userId: string) {
    const response = await this.userService.getMyData(Number(userId));

    return new ApiResponse('내 정보 조회 성공', response);
  }

  @Patch('image')
  @UseGuards(JwtAuthGuard)
  @ApiSingleResponse(200, SigninResponse, '프로필 이미지 변경 완료')
  @UseInterceptors(FileInterceptor('profile'))
  async updateProfileImage(@User('id') userId: string, @UploadedFile() file: Express.Multer.File) {
    const response = await this.userService.updateProfileImage(file, Number(userId));

    return new ApiResponse('프로필 이미지 변경 완료', response);
  }
}
