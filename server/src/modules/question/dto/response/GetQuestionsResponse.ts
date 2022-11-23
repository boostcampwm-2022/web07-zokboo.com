import { BadRequestException } from '@nestjs/common';
import Question from '../../domain/Question';

export default class GetQuestionsResponse {
  public questionId: number;
  public question: string;
  public questionType: string;
  public answer: string;
  public commentary: string;
  public createdAt: Date;
  public updatedAt: Date;
  constructor(record: Question) {
    if (!record.questionId) {
      throw new BadRequestException('저장되지 않은 Question');
    }
    this.questionId = Number(record.questionId);
    this.question = record.question;
    this.questionType = record.questionType;
    this.answer = record.answer;
    this.commentary = record.commentary;
    this.createdAt = record.createdAt;
    this.updatedAt = record.updatedAt;
  }
}
