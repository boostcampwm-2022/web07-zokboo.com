import Question from 'src/modules/question/domain/Question';
import QuestionType from 'src/modules/question/enum/QuestionType';

class QuestionDetailResponse {
  public questionId: number;
  public question: string;
  public difficulty: number;
  public answer: string;
  public commentary: string;
  public questionType: QuestionType;
  public images: string[];
  public options: string[] | undefined;
  public hashtags: string[];

  constructor(question: Question) {
    this.questionId = Number(question.questionId);
    this.question = question.question;
    this.difficulty = question.difficulty;
    this.answer = question.answer;
    this.commentary = question.commentary;
    this.questionType = question.questionType;
    this.images = question.images.map((i) => i.path);
    if (this.questionType === QuestionType.MULTIPLE) {
      this.options = question.options.map((o) => o.content);
    }
    this.hashtags = question.hashtags.map((h) => h.name);
  }
}

export default QuestionDetailResponse;
