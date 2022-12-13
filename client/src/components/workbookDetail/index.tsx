import { GetQuestionResponse } from '../../types/question';
import SampleQuestionImage from '../../images/sample-question-image.png';
import {
  Header,
  Problem,
  ProblemCommentary,
  ProblemDifficulty,
  ProblemDropdown,
  ProblemHashtags,
  ProblemImg,
  ProblemNumber,
  ProblemOptions,
  ProblemTitle,
  QuestionType,
} from './Style';
import { DIFFICULTY, QUESTION_TYPE } from '../../utils/constants';

interface QuestionItemProps extends GetQuestionResponse {
  index: number;
}

const QuestionItem = (props: QuestionItemProps) => {
  const { questionId, index, question, hashtags, difficulty, commentary, images, questionType, options } = props;
  const isSubjective = questionType === QUESTION_TYPE.subjective;
  return (
    <ProblemDropdown key={questionId}>
      <Header>
        <ProblemNumber>🔽 {index + 1}번 문제</ProblemNumber>
        <QuestionType type={isSubjective}>{isSubjective ? '📄 주관식' : '🔢 객관식'}</QuestionType>
      </Header>
      <Problem>
        <ProblemTitle>문제 : {question}</ProblemTitle>
        <ProblemOptions>{JSON.stringify(options)}</ProblemOptions>
        <ProblemImg src={images[0]} alt="" />

        <ProblemHashtags>
          해시태그 :
          {hashtags.map((hashtag, idx) => {
            return <div key={hashtag}>{hashtag}</div>;
          })}
        </ProblemHashtags>
        <ProblemDifficulty>난이도 : {DIFFICULTY[difficulty]}</ProblemDifficulty>
        <ProblemCommentary>메모 : {commentary}</ProblemCommentary>
      </Problem>
    </ProblemDropdown>
  );
};

export default QuestionItem;
