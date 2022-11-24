interface PostCreateQuestionBody {
  question: string;
  questionType: string;
  answer: string;
  commentary: string;
  difficulty: number;
  hashtags: string[];
}

export default PostCreateQuestionBody;
