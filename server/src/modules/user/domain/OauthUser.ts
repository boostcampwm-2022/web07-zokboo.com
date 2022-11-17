import { randomUUID } from 'crypto';
import OauthType from '../enum/OauthType';
import User from './User';
import { OauthUser as pOauthUser, User as pUser } from '@prisma/client';

export default class OauthUser extends User {
  public oauthId: string;
  public oauthType: OauthType;

  constructor(
    userId: bigint | undefined,
    nickname: string,
    avatar: string,
    createdAt: Date,
    updatedAt: Date,
    oauthId: string,
    oauthType: OauthType,
  ) {
    super(userId, nickname, avatar, createdAt, updatedAt);
    this.oauthId = oauthId;
    this.oauthType = oauthType;
  }

  static new(oauthType: OauthType, oauthId: string) {
    const now = new Date();
    const nickname = oauthType.toString() + '-' + randomUUID();
    return new OauthUser(undefined, nickname, '', now, now, oauthId, oauthType);
  }

  static oauthOf(
    record: pOauthUser & {
      User: pUser;
    },
  ) {
    return new OauthUser(
      record.user_id,
      record.User.nickname,
      record.User.avatar,
      record.User.created_at,
      record.User.updated_at,
      record.oauth_id,
      OauthType[record.oauth_type],
    );
  }
}
