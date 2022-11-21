import { Injectable } from '@nestjs/common';
import User from '../user/domain/User';
import Hashtag from './domain/Hashtag';
import Option from './domain/Option';
import Question from './domain/Question';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import CreateQuestionResponse from './dto/response/CreateQuestionResponse';
import QuestionType from './enum/QuestionType';
import { QuestionRepository } from './QuestionRepository';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async createQuestion(request: CreateQuestionRequest, user: User) {
    const question = Question.new(
      request.question,
      request.questionType,
      user.userId,
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
