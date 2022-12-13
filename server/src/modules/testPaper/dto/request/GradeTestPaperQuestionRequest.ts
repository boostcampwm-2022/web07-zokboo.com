import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString } from 'class-validator';
import QuestionType from 'src/modules/question/enum/QuestionType';

class GradeTestPaperQuestionRequest {
  @ApiProperty()
  @IsNumber()
  public testPaperQuestionId: number;

  @ApiProperty()
  @IsString()
  public writtenAnswer: string;
}

export default GradeTestPaperQuestionRequest;
