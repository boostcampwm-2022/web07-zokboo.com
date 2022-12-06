import { IsString } from 'class-validator';

export default class ResetPasswordRequest {
  @IsString()
  token: string;

  @IsString()
  password: string;

  @IsString()
  passwordConfirmation: string;
}
