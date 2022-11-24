// import { createException } from 'src/modules/common/exception/ErrorUtils';
// import bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class SignupRequest {
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

  @ApiProperty({
    maxLength: 20,
  })
  @IsString()
  public passwordConfirmation: string;

  @ApiProperty({
    maxLength: 10,
  })
  @IsString()
  public nickname: string;
}

export default SignupRequest;
