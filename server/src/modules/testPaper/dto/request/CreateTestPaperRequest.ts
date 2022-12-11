import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

class CreateTestPaperRequest {
  @IsString()
  @ApiProperty()
  public title: string;

  @IsInt()
  @ApiProperty()
  public testId: number;
}

export default CreateTestPaperRequest;
