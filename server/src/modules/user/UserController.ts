import { Controller, Patch, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './UserService';
import { User } from '../../decorators/UserDecorator';
import ApiResponse from '../common/response/ApiResponse';
import { ApiExtraModels } from '@nestjs/swagger';
import SigninResponse from './dto/response/SigninResponse';
import { ApiSingleResponse } from '../../decorators/ApiResponseDecorator';

@Controller('users')
@ApiExtraModels(SigninResponse)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch('image')
  @ApiSingleResponse(200, SigninResponse, '프로필 이미지 변경 완료')
  @UseInterceptors(FileInterceptor('profile'))
  async updateProfileImage(@User('id') userId: string, @UploadedFile() file: Express.Multer.File) {
    const response = await this.userService.updateProfileImage(file, Number(userId));

    return new ApiResponse('프로필 이미지 변경 완료', response);
  }
}
