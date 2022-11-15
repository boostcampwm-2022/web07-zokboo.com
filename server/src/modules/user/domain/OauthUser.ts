import { randomUUID } from 'crypto';
import OauthType from '../enum/OauthType';
import User from './User';

export default class OauthUser extends User {
  public oauthId: bigint;
  public oauthType: OauthType;

  constructor(
    userId: bigint | undefined,
    nickname: string,
    avatar: string,
    createdAt: Date,
    updatedAt: Date,
    oauthId: bigint,
    oauthType: OauthType,
  ) {
    super(userId, nickname, avatar, createdAt, updatedAt);
    this.oauthId = oauthId;
    this.oauthType = oauthType;
  }

  static new(oauthType: OauthType, oauthId: bigint) {
    const now = new Date();
    const nickname = oauthType.toString() + randomUUID;
    return new OauthUser(undefined, nickname, '', now, now, oauthId, oauthType);
  }
}
