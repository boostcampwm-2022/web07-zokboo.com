import { IsString } from 'class-validator';

export default class ResetTokenRequest {
  @IsString()
  public email: string;
}
