import { BadRequestException, Injectable } from '@nestjs/common';
import Hashtag from './domain/Hashtag';
import Option from './domain/Option';
import Question from './domain/Question';
import CreateQuestionRequest from './dto/request/CreateQuestionRequest';
import CreateQuestionResponse from './dto/response/CreateQuestionResponse';
import GetQuestionsQuery from './dto/query/GetQuestionsQuery';
import GetQuestionsResponse from './dto/response/GetQuestionsResponse';
import QuestionType from './enum/QuestionType';
import { QuestionRepository } from './QuestionRepository';
import { PrismaInstance } from '../common/PrismaInstance';
import QuestionImage from './domain/QuestionImage';
import { ImageUploader } from '../common/ImageUploader';
import QuestionLike from './domain/QuestionLike';
import LikeQuestionResponse from './dto/response/LikeQuestionResponse';

@Injectable()
export class QuestionService {
  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly prisma: PrismaInstance,
    private readonly imageUploader: ImageUploader,
  ) {}

  async getQuestions(query: GetQuestionsQuery, userId: number): Promise<GetQuestionsResponse[]> {
    let result: GetQuestionsResponse[];
    await this.prisma.$transaction(async (tx) => {
      if (query.hashtag) {
        const hashtag = await this.questionRepository.findHashtagByName(query.hashtag, tx);
        if (!hashtag) {
          result = [];
          return;
        }
        const questions = await this.questionRepository.findQuestionsWithDetailsByHashtag(hashtag, tx);
        if (query.text) {
          result = questions.filter((q) => q.question.includes(query.text)).map((q) => new GetQuestionsResponse(q));
          return;
        }
        result = questions.map((q) => new GetQuestionsResponse(q));
        return;
      }
      if (query.text) {
        const questions = await this.questionRepository.findQuestionsWithDetailsByQuestion(query.text, tx);

        result = questions.map((q) => new GetQuestionsResponse(q));
        return;
      }
      const questions = await this.questionRepository.findQuestionsWithDetailsByUserId(userId, tx);

      result = questions.map((q) => new GetQuestionsResponse(q));
    });
    return result;
  }

  async createQuestion(request: CreateQuestionRequest, userId: number) {
    let result: CreateQuestionResponse;
    await this.prisma.$transaction(async (tx) => {
      const question = Question.new(
        request.question,
        request.questionType,
        BigInt(userId),
        request.answer,
        request.commentary,
        Number(request.difficulty),
      );
      const hashtags = JSON.parse(request.hashtags) as string[];
      const options = JSON.parse(request.options) as string[];
      question.setHashtags(hashtags.map((hashtag) => Hashtag.new(hashtag)));
      if (request.questionType === QuestionType.MULTIPLE) {
        question.setOptions(options.map((option) => Option.new(option)));
      }
      if (request.images.length !== 0) {
        const paths = [];
        for (const image of request.images) {
          const { path } = await this.imageUploader.uploadImage(image);
          paths.push(path);
        }
        question.setImages(paths.map((path) => new QuestionImage(undefined, undefined, path)));
      }
      await this.questionRepository.save(question, tx);
      result = new CreateQuestionResponse(question);
    });
    return result;
  }

  async likeQuestion(questionId: number, userId: number) {
    let result: LikeQuestionResponse;
    await this.prisma.$transaction(async (tx) => {
      const hasLiked = await this.questionRepository.checkLiked(questionId, userId, tx);

      if (hasLiked) {
        throw new BadRequestException('ALREADY_LIKED_QUESTION');
      }
      const newLike = new QuestionLike(BigInt(questionId), BigInt(userId));
      const likeResult = await this.questionRepository.createQuestionLike(newLike, tx);
      result = new LikeQuestionResponse(likeResult);
    });
    return result;
  }

  async dislikeQuestion(questionId: number, userId: number) {
    let result: LikeQuestionResponse;
    await this.prisma.$transaction(async (tx) => {
      const hasLiked = await this.questionRepository.checkLiked(questionId, userId, tx);

      if (!hasLiked) {
        throw new BadRequestException('NO_LIKE_FOUND');
      }
      const newDislike = new QuestionLike(BigInt(questionId), BigInt(userId));
      const dislikeResult = await this.questionRepository.deleteQuestionLike(newDislike, tx);

      if (dislikeResult !== 1) {
        throw new BadRequestException('DISLIKE_FAILED');
      }

      result = new LikeQuestionResponse(newDislike);
    });

    return result;
  }
}
