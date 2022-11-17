import User from './User';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
import { BasicUser as pBasicUser, User as pUser } from '@prisma/client';

export default class BasicUser extends User {
  public email: string;
  public password: string;

  constructor(
    userId: bigint | undefined,
    nickname: string,
    avatar: string,
    createdAt: Date,
    updatedAt: Date,
    email: string,
    password: string,
  ) {
    super(userId, nickname, avatar, createdAt, updatedAt);
    this.email = email;
    this.password = password;
  }

  static new(email: string, nickname: string, password: string) {
    const now = new Date();
    return new BasicUser(undefined, nickname, '', now, now, email, password);
    User;
  }

  static basicOf(
    record: pBasicUser & {
      User: pUser;
    },
  ) {
    return new BasicUser(
      record.user_id,
      record.User.nickname,
      record.User.avatar,
      record.User.created_at,
      record.User.updated_at,
      record.email,
      record.password,
    );
  }

  authenticate(password: string) {
    if (!bcrypt.compareSync(password, this.password)) {
      throw new BadRequestException('잘못된 password');
    }
  }
}
