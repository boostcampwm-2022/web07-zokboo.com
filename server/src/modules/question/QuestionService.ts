import { Injectable } from '@nestjs/common';
import Hashtag from './domain/Hashtag';
import Option from './domain/Option';
import Question from './domain/Question';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import CreateQuestionResponse from './dto/response/CreateQuestionResponse';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';
import GetQuestionsResponse from './dto/response/GetQuestionsResponse';
import QuestionType from './enum/QuestionType';
import { QuestionRepository } from './QuestionRepository';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

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

  async createQuestion(request: CreateQuestionRequest, userId: number) {
    const question = Question.new(
      request.question,
      request.questionType,
      BigInt(userId),
      request.answer,
      request.commentary,
      request.difficulty,
    );
    question.setHashtags(request.hashtags.map((hashtag) => Hashtag.new(hashtag)));
    if (request.questionType === QuestionType.MULTIPLE) {
      question.setOptions(request.options.map((option) => Option.new(option)));
    }
    await this.questionRepository.save(question);
    return new CreateQuestionResponse(question);
  }
}
