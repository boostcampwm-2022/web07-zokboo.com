import { ApiProperty } from '@nestjs/swagger';
import Question from '../../domain/Question';
import QuestionType from '../../enum/QuestionType';

class CreateQuestionResponse {
  @ApiProperty()
  public questionId: number;

  @ApiProperty()
  public question: string;

  @ApiProperty({
    enum: QuestionType,
    enumName: 'Question Type',
  })
  public questionType: string;

  @ApiProperty()
  public difficulty: number;

  @ApiProperty()
  public hashtags: string[];

  constructor(record: Question) {
    this.questionId = Number(record.questionId);
    this.question = record.question;
    this.questionType = record.questionType;
    this.difficulty = record.difficulty;
    this.hashtags = record.hashtags.map((hashtag) => hashtag.name);
  }
}

export default CreateQuestionResponse;
