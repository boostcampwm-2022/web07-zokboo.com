import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import Question from '../../domain/Question';
import QuestionType from '../../enum/QuestionType';

export default class GetQuestionsResponse {
  @ApiProperty()
  public questionId: number;

  @ApiProperty()
  public question: string;

  @ApiProperty()
  public images: string[];

  // @ApiProperty({
  //   enum: QuestionType,
  //   enumName: 'Question Type',
  // })
  // public questionType: string;

  // @ApiProperty()
  // public answer: string;

  // @ApiProperty()
  // public commentary: string;

  // @ApiProperty()
  // public createdAt: Date;

  // @ApiProperty()
  // public updatedAt: Date;

  // @ApiProperty()
  // public hashtags: string[];

  // @ApiProperty()
  // public options: string[] | undefined;

  constructor(record: Question) {
    if (!record.questionId) {
      throw new BadRequestException('저장되지 않은 Question');
    }
    this.questionId = Number(record.questionId);
    this.question = record.question;
    this.images = record.images.map((i) => i.path);
    // this.questionType = record.questionType;
    // this.answer = record.answer;
    // this.commentary = record.commentary;
    // this.createdAt = record.createdAt;
    // this.updatedAt = record.updatedAt;
    // this.hashtags = record.hashtags.map((h) => h.name);
    // if (record.questionType === QuestionType.MULTIPLE) {
    //   this.options = record.options.map((o) => o.content);
    // }
  }
}
