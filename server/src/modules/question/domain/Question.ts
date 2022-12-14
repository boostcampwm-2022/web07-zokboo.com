import QuestionType from '../enum/QuestionType';
import Hashtag from './Hashtag';
import Option from './Option';
import QuestionImage from './QuestionImage';
import { Question as pQuestion } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';

class Question {
  public questionId: bigint | undefined;
  public question: string;
  public questionType: QuestionType;
  public userId: bigint;
  public answer: string;
  public commentary: string;
  public difficulty: number;
  public images: QuestionImage[];
  public hashtags: Hashtag[];
  public options: Option[];
  public createdAt: Date;
  public updatedAt: Date;
  constructor(
    questionId: bigint,
    question: string,
    questionType: QuestionType,
    userId: bigint,
    answer: string,
    commentary: string,
    difficulty: number,
    images: QuestionImage[] | undefined,
    hashtags: Hashtag[] | undefined,
    options: Option[] | undefined,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.questionId = questionId;
    this.question = question;
    this.questionType = questionType;
    this.userId = userId;
    this.answer = answer;
    this.commentary = commentary;
    this.difficulty = difficulty;
    this.images = images;
    this.hashtags = hashtags;
    this.options = options;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static of(record: pQuestion) {
    return new Question(
      record.question_id,
      record.question,
      QuestionType[record.question_type],
      record.user_id,
      record.answer,
      record.commentary,
      record.difficulty,
      [],
      [],
      [],
      record.created_at,
      record.updated_at,
    );
  }

  static new(
    question: string,
    questionType: string,
    userId: bigint,
    answer: string,
    commentary: string,
    difficulty: number,
  ) {
    const now = new Date();
    return new Question(
      undefined,
      question,
      QuestionType[questionType],
      userId,
      answer,
      commentary,
      difficulty,
      [],
      [],
      [],
      now,
      now,
    );
  }

  setId(questionId: bigint) {
    this.questionId = questionId;
  }

  setImages(images: QuestionImage[]) {
    this.images = images;
  }

  setHashtags(hashtags: Hashtag[]) {
    this.hashtags = hashtags;
  }

  setOptions(options: Option[]) {
    if (this.questionType !== QuestionType.MULTIPLE) {
      throw new BadRequestException('????????? ???????????? ????????? ????????? ??? ????????????.');
    }
    if (options.length < 1 || options.length > 5) {
      throw new BadRequestException('????????? ???????????? 1??? ~ 5?????? ????????? ???????????????.');
    }
    if (!options.map((option) => option.content).includes(this.answer)) {
      throw new BadRequestException('???????????? ????????? ????????????.');
    }
    this.options = options;
  }
}

export default Question;
