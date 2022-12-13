import { ApiProperty } from '@nestjs/swagger';
import Question from '../../domain/Question';
import QuestionType from '../../enum/QuestionType';

class QuestionSimpleResponse {
  @ApiProperty()
  public questionId: number;

  @ApiProperty()
  public question: string;

  @ApiProperty()
  public difficulty: number;

  @ApiProperty()
  public answer: string;

  @ApiProperty()
  public commentary: string;

  @ApiProperty({
    enum: QuestionType,
    enumName: 'Question Type',
  })
  public questionType: QuestionType;

  constructor(question: Question) {
    this.questionId = Number(question.questionId);
    this.question = question.question;
    this.difficulty = question.difficulty;
    this.answer = question.answer;
    this.commentary = question.commentary;
    this.questionType = question.questionType;
  }
}

export default QuestionSimpleResponse;
