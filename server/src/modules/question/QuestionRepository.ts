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
        difficulty: question.difficulty,
        created_at: question.createdAt,
        updated_at: question.updatedAt,
      },
    });
    question.setId(newQuestion.question_id);

    if (question.images) {
      question.images.forEach(async (image) => await this.createQuestionImage(image, question.questionId));
    }

    if (question.hashtags) {
      question.hashtags.forEach(async (hashtag) => {
        await this.createHashtag(hashtag);
        await this.createQuestionHashtag(question.questionId, hashtag.hashtagId);
      });
    }

    if (question.questionType === QuestionType.MULTIPLE && question.options) {
      question.options.forEach(async (option) => await this.createOption(option, question.questionId));
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
        difficulty: question.difficulty,
        updated_at: question.updatedAt,
      },
    });
    return question;
  }

  async createQuestionImage(questionImage: QuestionImage, questionId: bigint) {
    const newImage = await this.prisma.questionImage.create({
      data: {
        path: questionImage.path,
        question_id: questionId,
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

  async createOption(option: Option, questionId: bigint) {
    const newOption = this.prisma.option.create({
      data: {
        content: option.content,
        question_id: questionId,
      },
    });
    option.setId((await newOption).option_id);
    return option;
  }

  async findQuestionsByUserId(userId: bigint) {
    const questions = await this.prisma.question.findMany({
      where: {
        user_id: userId,
      },
    });
    return questions.map((question) => Question.of(question));
  }

  async findQuestionsWithDetailsByUserId(userId: bigint) {
    //TODO: 객관식에 한해서만 Option table과 Join하게 할 수는 없을까?
    //TODO: 문제집에 공개범위가 있을게 아니라 문제에 공개범위가 있어야 하나? 왜냐면 한개의 문제가 여러 문제집과 연관되어 있을 수 있는데 그렇다면 어떤 문제집을 기준으로...? 첫 문제집..? 그렇다면 차라리 공개여부 column을 문제에도 만들어 두는건 어떨까?
    const questions = await this.prisma.question.findMany({
      where: {
        user_id: userId,
      },
      include: {
        Option: true,
        QuestionImage: true,
        QuestionHashtag: {
          include: {
            Hashtag: true,
          },
        },
      },
    });
    return questions.map((q) => {
      const question = Question.of(q);
      question.setImages(q.QuestionImage.map((image) => QuestionImage.of(image)));
      question.setOptions(q.Option.map((option) => Option.of(option)));
      question.setHashtags(q.QuestionHashtag.map((h) => Hashtag.of(h.Hashtag)));
    });
  }

  async findQuestionByHashtag(hashtag: Hashtag) {
    const result = await this.prisma.questionHashtag.findMany({
      where: {
        hashtag_id: hashtag.hashtagId,
      },
      include: {
        Question: true,
      },
    });
    return result.map((r) => Question.of(r.Question));
  }

  async findQuestionsWithDetailsByHashtag(hashtag: Hashtag) {
    //TODO: 객관식에 한해서만 Option table과 Join하게 할 수는 없을까?
    //TODO: 문제집에 공개범위가 있을게 아니라 문제에 공개범위가 있어야 하나? 왜냐면 한개의 문제가 여러 문제집과 연관되어 있을 수 있는데 그렇다면 어떤 문제집을 기준으로...? 첫 문제집..? 그렇다면 차라리 공개여부 column을 문제에도 만들어 두는건 어떨까?
    const result = await this.prisma.questionHashtag.findMany({
      where: {
        hashtag_id: hashtag.hashtagId,
      },
      include: {
        Question: {
          include: {
            QuestionImage: true,
            Option: true,
            QuestionHashtag: {
              include: {
                Hashtag: true,
              },
            },
          },
        },
      },
    });
    return result.map((r) => {
      const question = Question.of(r.Question);
      question.setHashtags(r.Question.QuestionHashtag.map((h) => Hashtag.of(h.Hashtag)));
      question.setImages(r.Question.QuestionImage.map((image) => QuestionImage.of(image)));
      question.setOptions(r.Question.Option.map((option) => Option.of(option)));
    });
  }

  async findQuestionsByIds(questionIds: number[]) {
    const questions = await this.prisma.question.findMany({
      where: {
        question_id: { in: questionIds },
      },
    });
    return questions.map((question) => Question.of(question));
  }
}
