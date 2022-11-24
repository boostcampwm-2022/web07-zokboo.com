import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import User from '../../domain/User';

class SigninResponse {
  @ApiProperty()
  public userId: number;

  @ApiProperty()
  public nickname: string;

  @ApiProperty()
  public avatar: string;

  constructor(record: User) {
    if (!record.userId) {
      throw new BadRequestException('저장되지 않은 User');
    }
    this.userId = Number(record.userId);
    this.nickname = record.nickname;
    this.avatar = record.avatar;
  }
}

export default SigninResponse;
