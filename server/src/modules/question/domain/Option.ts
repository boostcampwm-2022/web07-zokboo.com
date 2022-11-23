import { Option as pOption } from '@prisma/client';

class Option {
  public optionId: bigint | undefined;
  public content: string;
  public questionId: bigint | undefined;
  constructor(optionId: bigint, content: string, questionId: bigint) {
    this.optionId = optionId;
    this.content = content;
    this.questionId = questionId;
  }

  static of(record: pOption) {
    return new Option(record.option_id, record.content, record.question_id);
  }

  static new(content: string) {
    return new Option(undefined, content, undefined);
  }

  setId(optionId: bigint) {
    this.optionId = optionId;
  }
}

export default Option;
