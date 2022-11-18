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
}

export default SignupRequest;
