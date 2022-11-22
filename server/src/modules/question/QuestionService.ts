import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './QuestionRepository';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';
import GetQuestionsResponse from './dto/response/GetQuestionsResponse';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async getQuestions(query: GetQuestionsQuery): Promise<GetQuestionsResponse> {
    console.log(query);
    return new GetQuestionsResponse();
  }
}
