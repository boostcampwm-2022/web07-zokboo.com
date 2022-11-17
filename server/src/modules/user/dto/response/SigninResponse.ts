import { BadRequestException } from '@nestjs/common';
import User from '../../domain/User';

class SigninResponse {
  public userId: number;
  public nickname: string;
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
