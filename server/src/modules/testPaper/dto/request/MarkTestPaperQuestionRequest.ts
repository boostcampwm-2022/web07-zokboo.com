import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import QuestionType from 'src/modules/question/enum/QuestionType';

class MarkTestPaperQuestionRequest {
  @ApiProperty()
  @IsInt()
  public testPaperQuestionId: number;

  @ApiProperty()
  @IsBoolean()
  public isCorrect: boolean;
}

export default MarkTestPaperQuestionRequest;
