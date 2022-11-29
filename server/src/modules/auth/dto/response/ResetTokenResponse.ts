import { ApiProperty } from '@nestjs/swagger';

export default class ResetTokenResponse {
  @ApiProperty()
  public token: string;

  constructor(token: string) {
    this.token = token;
  }
}
