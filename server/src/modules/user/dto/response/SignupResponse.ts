import User from '../../domain/User';

class SignupResponse {
  public userId: number;

  constructor(user: User) {
    this.userId = Number(user.userId);
  }
}

export default SignupResponse;
