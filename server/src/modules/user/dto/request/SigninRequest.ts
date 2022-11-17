import { IsString } from 'class-validator';

class SigninRequest {
  @IsString()
  public email: string;
  @IsString()
  public password: string;
}

export default SigninRequest;
