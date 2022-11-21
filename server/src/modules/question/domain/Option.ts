import { Option as pOption } from '@prisma/client';

class Option {
  public optionId: bigint;
  public content: string;
  public questionId: bigint;
  constructor(optionId: bigint, content: string, questionId: bigint) {
    this.optionId = optionId;
    this.content = content;
    this.questionId = questionId;
  }

  static of(record: pOption) {
    return new Option(record.option_id, record.content, record.question_id);
  }
}

export default Option;
