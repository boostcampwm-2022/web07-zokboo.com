import { IsNumber, IsString } from 'class-validator';

export default class SSOSignupRequest {
  @IsString()
  public oauthType: string;

  @IsNumber()
  public oauthId: bigint;
}
