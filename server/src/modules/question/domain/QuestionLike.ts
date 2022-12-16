import { QuestionLike as pQuestionLike } from '@prisma/client';

class QuestionLike {
  public questionId: bigint | undefined;
  public userId: bigint | undefined;

  constructor(questionId: bigint | undefined, userId: bigint | undefined) {
    this.questionId = questionId;
    this.userId = userId;
  }

  static of(record: pQuestionLike) {
    return new QuestionLike(record.question_id, record.user_id);
  }
}

export default QuestionLike;
