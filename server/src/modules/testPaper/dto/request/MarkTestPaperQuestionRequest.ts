import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import QuestionType from 'src/modules/question/enum/QuestionType';

class MarkTestPaperQuestionRequest {
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
  @IsBoolean()
  public isCorrect: boolean;
}

export default MarkTestPaperQuestionRequest;
