import { randomUUID } from 'crypto';
import OauthType from '../enum/OauthType';
import User from './User';

export default class OauthUser extends User {
  private oauthId: number;
  private oauthType: OauthType;

  constructor(
    userId: number | undefined,
    nickname: string,
    avatar: string,
    createdAt: Date,
    updatedAt: Date,
    oauthId: number,
    oauthType: OauthType,
  ) {
    super(userId, nickname, avatar, createdAt, updatedAt);
    this.oauthId = oauthId;
    this.oauthType = oauthType;
  }

  static new(oauthType: OauthType, oauthId: number) {
    const now = new Date();
    const nickname = oauthType.toString() + randomUUID;
    return new OauthUser(undefined, nickname, '', now, now, oauthId, oauthType);
  }
}
