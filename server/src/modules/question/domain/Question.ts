import QuestionType from '../enum/QuestionType';
import Hashtag from './Hashtag';
import Option from './Option';
import QuestionImage from './QuestionImage';
import {
  Question as pQuestion,
  QuestionImage as pQuestionImage,
  Hashtag as pHashtag,
  Option as pOption,
} from '@prisma/client';

class Question {
  public questionId: bigint | undefined;
  public question: string;
  public questionType: QuestionType;
  public userId: bigint;
  public answer: string;
  public commentary: string;
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
      undefined,
      undefined,
      undefined,
      record.created_at,
      record.updated_at,
    );
  }

  setId(questionId: bigint) {
    this.questionId = questionId;
  }

  setImages(images: pQuestionImage[]) {
    this.images = images.map((image) => QuestionImage.of(image));
  }

  setHashtags(hashtags: pHashtag[]) {
    this.hashtags = hashtags.map((hashtag) => Hashtag.of(hashtag));
  }

  setOptions(options: pOption[]) {
    this.options = options.map((option) => Option.of(option));
  }
}

export default Question;
