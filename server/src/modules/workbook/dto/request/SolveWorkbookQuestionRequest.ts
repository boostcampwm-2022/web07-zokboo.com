import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class SolveWorkbookQuestionRequest {
  @ApiProperty()
  @IsString()
  public newAnswer: string;
}

export default SolveWorkbookQuestionRequest;
