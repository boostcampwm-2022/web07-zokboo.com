import { ApiProperty } from '@nestjs/swagger';
import User from '../../../user/domain/User';
import { BadRequestException } from '@nestjs/common';

export default class ResetPasswordResponse {
  @ApiProperty()
  public userId: number;

  constructor(record: User) {
    if (!record.userId) {
      throw new BadRequestException('저장되지 않은 User');
    }
    this.userId = Number(record.userId);
  }
}
