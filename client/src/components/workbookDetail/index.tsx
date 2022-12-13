import { GetQuestionResponse } from '../../types/question';
import SampleQuestionImage from '../../images/sample-question-image.png';
import {
  Problem,
  ProblemCommentary,
  ProblemDifficulty,
  ProblemDropdown,
  ProblemHashtags,
  ProblemImg,
  ProblemNumber,
  ProblemTitle,
} from './Style';

interface QuestionItemProps extends GetQuestionResponse {
  index: number;
}

const QuestionItem = (props: QuestionItemProps) => {
  const { questionId, index, question, hashtags, difficulty, commentary } = props;
  return (
    <ProblemDropdown key={questionId}>
      <ProblemNumber>{index + 1}번 문제</ProblemNumber>
      <Problem>
        <ProblemTitle>문제 : {question}</ProblemTitle>
        <ProblemImg src={SampleQuestionImage} alt="" />

        <ProblemHashtags>
          해시태그 :
          {hashtags.map((hashtag, idx) => {
            return <div key={hashtag}>{hashtag}</div>;
          })}
        </ProblemHashtags>
        <ProblemDifficulty>난이도 : {difficulty}</ProblemDifficulty>
        <ProblemCommentary>메모 : {commentary}</ProblemCommentary>
      </Problem>
    </ProblemDropdown>
  );
};

export default QuestionItem;
