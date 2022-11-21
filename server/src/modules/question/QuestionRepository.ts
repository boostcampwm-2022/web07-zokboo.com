import { Injectable } from '@nestjs/common';
import { PrismaInstance } from '../common/PrismaInstance';
import Hashtag from './domain/Hashtag';
import Option from './domain/Option';
import Question from './domain/Question';
import QuestionImage from './domain/QuestionImage';
import QuestionType from './enum/QuestionType';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaInstance) {}
  async save(question: Question) {
    if (question.questionId) {
      return await this.updateQuestion(question);
    }
    return await this.createQuestion(question);
  }

  async createQuestion(question: Question) {
    const newQuestion = await this.prisma.question.create({
      data: {
        question: question.question,
        question_type: question.questionType,
        user_id: question.userId,
        answer: question.answer,
        commentary: question.commentary,
        created_at: question.createdAt,
        updated_at: question.updatedAt,
      },
    });
    question.setId(newQuestion.question_id);

    if (question.images) {
      question.images.forEach(async (image) => await this.createQuestionImage(image));
    }

    if (question.hashtags) {
      question.hashtags.forEach(async (hashtag) => {
        await this.createHashtag(hashtag);
        await this.createQuestionHashtag(question.questionId, hashtag.hashtagId);
      });
    }

    if (question.questionType === QuestionType.MULTIPLE && question.options) {
      question.options.forEach(async (option) => await this.createOption(option));
    }

    return question;
  }

  async updateQuestion(question: Question) {
    await this.prisma.question.update({
      where: {
        question_id: question.questionId,
      },
      data: {
        question: question.question,
        answer: question.answer,
        commentary: question.commentary,
        updated_at: question.updatedAt,
      },
    });
    return question;
  }

  async createQuestionImage(questionImage: QuestionImage) {
    const newImage = await this.prisma.questionImage.create({
      data: {
        path: questionImage.path,
        question_id: questionImage.questionId,
      },
    });
    questionImage.setId(newImage.question_id);
    return questionImage;
  }

  async createHashtag(hashtag: Hashtag) {
    const newHashtag = await this.prisma.hashtag.upsert({
      where: {
        name: hashtag.name,
      },
      create: {
        name: hashtag.name,
      },
      update: {},
    });
    hashtag.setId(newHashtag.hashtag_id);
    return hashtag;
  }

  async createQuestionHashtag(questionId: bigint, hashtagId: bigint) {
    await this.prisma.questionHashtag.create({
      data: {
        question_id: questionId,
        hashtag_id: hashtagId,
      },
    });
  }

  async createOption(option: Option) {
    const newOption = this.prisma.option.create({
      data: {
        content: option.content,
        question_id: option.questionId,
      },
    });
    option.setId((await newOption).option_id);
    return option;
  }
}
