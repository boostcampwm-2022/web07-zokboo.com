import BasicUser from '../../../user/domain/BasicUser';
import { BadRequestException } from '@nestjs/common';

export default class VerifyResponse {
  public userId: number;
  public status: boolean;

  constructor(record: BasicUser) {
    if (!record.userId) {
      throw new BadRequestException('저장되지 않은 User');
    }
    this.userId = Number(record.userId);
    this.status = record.isApproved;
  }
}
