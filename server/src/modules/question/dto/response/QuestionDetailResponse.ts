import { ApiProperty } from '@nestjs/swagger';
import Question from '../../domain/Question';
import QuestionType from '../../enum/QuestionType';

class QuestionDetailResponse {
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

  @ApiProperty()
  public images: string[];

  @ApiProperty()
  public options: string[] | undefined;

  @ApiProperty()
  public hashtags: string[];

  constructor(question: Question) {
    this.questionId = Number(question.questionId);
    this.question = question.question;
    this.difficulty = question.difficulty;
    this.answer = question.answer;
    this.commentary = question.commentary;
    this.questionType = question.questionType;
    this.images = question.images.map((i) => i.path);
    if (this.questionType === QuestionType.MULTIPLE) {
      this.options = question.options.map((o) => o.content);
    }
    this.hashtags = question.hashtags.map((h) => h.name);
  }
}

export default QuestionDetailResponse;
