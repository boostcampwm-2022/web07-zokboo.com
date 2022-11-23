import { ApiProperty } from '@nestjs/swagger';
import Question from '../../domain/Question';
import QuestionType from '../../enum/QuestionType';

class CreateQuestionResponse {
  @ApiProperty()
  public question: string;

  @ApiProperty({
    enum: QuestionType,
    enumName: 'Question Type',
  })
  public questionType: string;

  @ApiProperty()
  public difficulty: number;

  constructor(record: Question) {
    this.question = record.question;
    this.questionType = record.questionType;
    this.difficulty = record.difficulty;
  }
}

export default CreateQuestionResponse;