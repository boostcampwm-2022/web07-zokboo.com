import { BadRequestException } from '@nestjs/common';
import User from '../../domain/User';

class SignupResponse {
  public userId: number;

  constructor(user: User) {
    if (!user.userId) {
      throw new BadRequestException('저장되지 않은 User');
    }
    this.userId = Number(user.userId);
  }
}

export default SignupResponse;
