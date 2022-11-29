import { ApiProperty } from '@nestjs/swagger';

class SolveWorkbookQuestionRequest {
  @ApiProperty()
  public newAnswer: string;
}

export default SolveWorkbookQuestionRequest;
