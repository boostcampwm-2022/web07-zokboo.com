// import { createException } from 'src/modules/common/exception/ErrorUtils';
// import bcrypt from 'bcrypt';
import { IsString } from 'class-validator';

class SignupRequest {
  @IsString()
  public email: string;
  @IsString()
  public password: string;
  @IsString()
  public passwordConfirmation: string;
  @IsString()
  public nickname: string;

  // constructor(email: string, password: string, passwordConfirmation: string, nickname: string) {
  //   this.setEmail(email);
  //   this.setPassword(password, passwordConfirmation);
  //   this.setNickname(nickname);
  // }

  // setEmail(email: string) {
  //   if (!email) {
  //     throw createException(400, 'email 누락');
  //   }
  //   if (email.length < 1 || email.length > 254) {
  //     throw createException(400, '잘못된 email 길이');
  //   }
  //   this.email = email;
  // }

  // setPassword(password: string, passwordConfirmation: string) {
  //   if (!password || !passwordConfirmation) {
  //     throw createException(400, 'password 및 password confirmation 누락');
  //   }
  //   if (password.length < 1 || password.length > 20) {
  //     throw createException(400, '잘못된 password 길이');
  //   }
  //   this.password = bcrypt.hashSync(password, 11);
  //   if (!bcrypt.compareSync(passwordConfirmation, this.password)) {
  //     throw createException(400, 'password 와 password confirmation 불일치');
  //   }
  // }

  // setNickname(nickname: string) {
  //   if (!nickname) {
  //     throw createException(400, 'nickname 누락');
  //   }
  //   if (nickname.length < 1 || nickname.length > 10) {
  //     throw createException(400, '잘못된 nickname 길이');
  //   }
  //   this.nickname = nickname;
  // }
}

export default SignupRequest;
