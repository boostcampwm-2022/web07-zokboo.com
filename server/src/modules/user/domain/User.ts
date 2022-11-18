import { BadRequestException } from '@nestjs/common';
import { User as pUser } from '@prisma/client';

export default class User {
  public userId: bigint | undefined;
  public nickname: string;
  public avatar: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(userId: bigint | undefined, nickname: string, avatar: string, createdAt: Date, updatedAt: Date) {
    this.userId = userId;
    this.nickname = nickname;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static of(record: pUser) {
    return new User(record.user_id, record.nickname, record.avatar, record.created_at, record.updated_at);
  }

  setId(userId: bigint) {
    this.userId = userId;
  }

  authenticate(password: string) {
    throw new BadRequestException('password로 인증이 불가한 User입니다.');
  }
}
