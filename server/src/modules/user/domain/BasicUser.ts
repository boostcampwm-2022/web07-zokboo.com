import User from './User';

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
  }
}
