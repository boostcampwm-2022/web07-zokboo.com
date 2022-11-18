import { IsString } from 'class-validator';

export default class SSOSigninRequest {
  @IsString()
  public oauthType: string;

  @IsString()
  public oauthId: string;
}
