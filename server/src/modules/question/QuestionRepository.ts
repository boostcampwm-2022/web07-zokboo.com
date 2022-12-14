import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaInstance } from '../common/PrismaInstance';
import Hashtag from './domain/Hashtag';
import Option from './domain/Option';
import Question from './domain/Question';
import QuestionImage from './domain/QuestionImage';
import QuestionType from './enum/QuestionType';
import QuestionLike from './domain/QuestionLike';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prismaInstance: PrismaInstance) {}

  async save(question: Question, tx?: Prisma.TransactionClient) {
    if (question.questionId) {
      return await this.updateQuestion(question, tx);
    }
    return await this.createQuestion(question, tx);
  }

  async createQuestion(question: Question, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newQuestion = await prisma.question.create({
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

    for (const image of question.images) {
      const newImage = await this.createQuestionImage(image, question.questionId, tx);
      image.setId(newImage.questionImageId);
    }

    for (const hashtag of question.hashtags) {
      await this.createHashtag(hashtag, tx);
      const questionHashtagId = await this.createQuestionHashtag(question.questionId, hashtag.hashtagId, tx);
      hashtag.setId(questionHashtagId);
    }

    if (question.questionType === QuestionType.MULTIPLE) {
      for (const option of question.options) {
        const newOption = await this.createOption(option, question.questionId, tx);
        option.setId(newOption.optionId);
      }
    }

    return question;
  }

  async updateQuestion(question: Question, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    await prisma.question.update({
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

  async createQuestionLike(questionLike: QuestionLike, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newLike = await prisma.questionLike.create({
      data: {
        question_id: questionLike.questionId,
        user_id: questionLike.userId,
      },
    });

    return QuestionLike.of(newLike);
  }

  async createQuestionImage(questionImage: QuestionImage, questionId: bigint, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newImage = await prisma.questionImage.create({
      data: {
        path: questionImage.path,
        question_id: questionId,
      },
    });
    questionImage.setId(newImage.question_id);
    return questionImage;
  }

  async createHashtag(hashtag: Hashtag, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newHashtag = await prisma.hashtag.upsert({
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

  async createQuestionHashtag(questionId: bigint, hashtagId: bigint, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const questionHashtag = await prisma.questionHashtag.create({
      data: {
        question_id: questionId,
        hashtag_id: hashtagId,
      },
    });
    return questionHashtag.question_hashtag_id;
  }

  async createOption(option: Option, questionId: bigint, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const newOption = await prisma.option.create({
      data: {
        content: option.content,
        question_id: questionId,
      },
    });
    option.setId(newOption.option_id);
    return option;
  }

  async checkLiked(questionId: number, userId: number, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const result = await prisma.questionLike.findFirst({
      where: {
        question_id: questionId,
        user_id: userId,
      },
    });

    return !!result;
  }

  async deleteQuestionLike(like: QuestionLike, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const result = await prisma.questionLike.deleteMany({
      where: {
        question_id: like.questionId,
        user_id: like.userId,
      },
    });

    return result.count;
  }

  async findQuestionsByUserId(userId: bigint, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const questions = await prisma.question.findMany({
      where: {
        user_id: userId,
      },
    });
    return questions.map((question) => Question.of(question));
  }

  async findQuestionsWithDetailsByUserId(userId: number, tx?: Prisma.TransactionClient) {
    //TODO: 객관식에 한해서만 Option table과 Join하게 할 수는 없을까?
    //TODO: 문제집에 공개범위가 있을게 아니라 문제에 공개범위가 있어야 하나? 왜냐면 한개의 문제가 여러 문제집과 연관되어 있을 수 있는데 그렇다면 어떤 문제집을 기준으로...? 첫 문제집..? 그렇다면 차라리 공개여부 column을 문제에도 만들어 두는건 어떨까?
    const prisma = tx ? tx : this.prismaInstance;
    const questions = await prisma.question.findMany({
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
      if (question.questionType === QuestionType.MULTIPLE) {
        question.setOptions(q.Option.map((option) => Option.of(option)));
      }
      question.setHashtags(q.QuestionHashtag.map((h) => Hashtag.of(h.Hashtag)));

      return question;
    });
  }

  async findQuestionByHashtag(hashtag: Hashtag, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const result = await prisma.questionHashtag.findMany({
      where: {
        hashtag_id: hashtag.hashtagId,
      },
      include: {
        Question: true,
      },
    });
    return result.map((r) => Question.of(r.Question));
  }

  async findQuestionsWithDetailsByQuestion(question: string, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const result = await prisma.question.findMany({
      where: {
        question: {
          contains: question,
        },
      },
      include: {
        QuestionImage: true,
        Option: true,
        QuestionHashtag: {
          include: {
            Hashtag: true,
          },
        },
      },
    });

    return result.map((r) => {
      const question = Question.of(r);
      question.setHashtags(r.QuestionHashtag.map((h) => Hashtag.of(h.Hashtag)));
      question.setImages(r.QuestionImage.map((i) => QuestionImage.of(i)));
      if (question.questionType === QuestionType.MULTIPLE) {
        question.setOptions(r.Option.map((option) => Option.of(option)));
      }

      return question;
    });
  }

  async findQuestionsWithDetailsByHashtag(hashtag: Hashtag, tx?: Prisma.TransactionClient) {
    //TODO: 객관식에 한해서만 Option table과 Join하게 할 수는 없을까?
    //TODO: 문제집에 공개범위가 있을게 아니라 문제에 공개범위가 있어야 하나? 왜냐면 한개의 문제가 여러 문제집과 연관되어 있을 수 있는데 그렇다면 어떤 문제집을 기준으로...? 첫 문제집..? 그렇다면 차라리 공개여부 column을 문제에도 만들어 두는건 어떨까?
    const prisma = tx ? tx : this.prismaInstance;
    const result = await prisma.questionHashtag.findMany({
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
      if (question.questionType === QuestionType.MULTIPLE) {
        question.setOptions(r.Question.Option.map((option) => Option.of(option)));
      }

      return question;
    });
  }

  async findHashtagByName(name: string, tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const result = await prisma.hashtag.findUnique({
      where: {
        name,
      },
    });
    if (!result) {
      return null;
    }
    return Hashtag.of(result);
  }

  async findQuestionsByIds(questionIds: number[], tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const questions = await prisma.question.findMany({
      where: {
        question_id: { in: questionIds },
      },
    });
    return questions.map((question) => Question.of(question));
  }

  async mapLikeByQuestionIds(userId: bigint, questionIds: bigint[], tx?: Prisma.TransactionClient) {
    const prisma = tx ? tx : this.prismaInstance;
    const result = await prisma.questionLike.findMany({
      where: {
        user_id: userId,
        question_id: {
          in: questionIds,
        },
      },
    });

    const resultSet = new Set(result.map((like) => like.question_id));

    return questionIds.map((questionId) => resultSet.has(questionId));
  }
}
