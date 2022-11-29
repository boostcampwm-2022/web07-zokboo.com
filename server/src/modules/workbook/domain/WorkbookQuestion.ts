import Question from 'src/modules/question/domain/Question';
import { WorkbookQuestion as pWorkbookQuestion } from '@prisma/client';

class WorkbookQuestion {
  public workbookQuestionId: bigint | undefined;
  public workbookId: bigint;
  public question: Question;
  public writtenAnswer: string;

  constructor(workbookQuestionId: bigint | undefined, workbookId: bigint, question: Question, writtenAnswer: string) {
    this.workbookQuestionId = workbookQuestionId;
    this.workbookId = workbookId;
    this.question = question;
    this.writtenAnswer = writtenAnswer;
  }

  static of(workbookQuestion: pWorkbookQuestion, question: Question) {
    return new WorkbookQuestion(
      workbookQuestion.workbook_question_id,
      workbookQuestion.workbook_id,
      question,
      workbookQuestion.written_answer,
    );
  }

  static new(workbookId: bigint | undefined, question: Question) {
    return new WorkbookQuestion(undefined, workbookId, question, '');
  }

  setId(workbookQuestionId: bigint) {
    this.workbookQuestionId = workbookQuestionId;
  }

  setWorkbookId(workbookId: bigint) {
    this.workbookId = workbookId;
  }
}

export default WorkbookQuestion;
