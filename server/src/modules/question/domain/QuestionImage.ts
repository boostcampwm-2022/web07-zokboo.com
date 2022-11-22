import { QuestionImage as pQuestionImage } from '@prisma/client';

class QuestionImage {
  public questionImageId: bigint | undefined;
  public questionId: bigint;
  public path: string;
  constructor(questionImageId: bigint, questionId: bigint, path: string) {
    this.questionImageId = questionImageId;
    this.questionId = questionId;
    this.path = path;
  }

  static of(record: pQuestionImage) {
    return new QuestionImage(record.question_image_id, record.question_id, record.path);
  }

  setId(imageId: bigint) {
    this.questionImageId = imageId;
  }
}

export default QuestionImage;
