export default class User {
  private userId: number | undefined;
  private nickname: string;
  private avatar: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(userId: number | undefined, nickname: string, avatar: string, createdAt: Date, updatedAt: Date) {
    this.userId = userId;
    this.nickname = nickname;
    this.avatar = avatar;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
