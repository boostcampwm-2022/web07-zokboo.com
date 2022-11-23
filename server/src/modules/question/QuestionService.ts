import { Injectable } from '@nestjs/common';
import { QuestionRepository } from './QuestionRepository';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';
import GetQuestionsResponse from './dto/response/GetQuestionsResponse';

@Injectable()
export class QuestionService {
  constructor(private questionRepository: QuestionRepository) {}

  async getQuestions(query: GetQuestionsQuery, userId: bigint): Promise<GetQuestionsResponse[]> {
    if (query.hashtag) {
      const hashtag = await this.questionRepository.findHashtagByName(query.hashtag);
      const questions = await this.questionRepository.findQuestionsWithDetailsByHashtag(hashtag);

      if (query.text) {
        return questions.filter((q) => q.question.includes(query.text)).map((q) => new GetQuestionsResponse(q));
      }
      return questions.map((q) => new GetQuestionsResponse(q));
    }
    if (query.text) {
      const questions = await this.questionRepository.findQuestionsWithDetailsByQuestion(query.text);

      return questions.map((q) => new GetQuestionsResponse(q));
    }
    const questions = await this.questionRepository.findQuestionsWithDetailsByUserId(userId);

    return questions.map((q) => new GetQuestionsResponse(q));
  }
}
