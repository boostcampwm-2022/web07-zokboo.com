import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class SigninRequest {
  @ApiProperty({
    maxLength: 254,
  })
  @IsString()
  public email: string;

  @ApiProperty({
    maxLength: 20,
  })
  @IsString()
  public password: string;
}

export default SigninRequest;
