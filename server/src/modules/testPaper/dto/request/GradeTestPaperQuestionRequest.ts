import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';
import QuestionType from 'src/modules/question/enum/QuestionType';

class GradeTestPaperQuestionRequest {
  @ApiProperty()
  @IsInt()
  public testPaperQuestionId: number;

  @ApiProperty({
    enum: QuestionType,
    enumName: 'Question Type',
  })
  @IsString()
  public questionType: QuestionType;

  @ApiProperty()
  @IsString()
  public writtenAnswer: string;
}

export default GradeTestPaperQuestionRequest;
