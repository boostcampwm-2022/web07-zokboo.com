import Question from '../../domain/Question';

class CreateQuestionResponse {
  public question: string;
  public questionType: string;
  public difficulty: number;
  constructor(record: Question) {
    this.question = record.question;
    this.questionType = record.questionType;
    this.difficulty = record.difficulty;
  }
}

export default CreateQuestionResponse;
