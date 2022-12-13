import { GetQuestionResponse } from '../../types/question';
import {
  Answer,
  Commentary,
  Difficulty,
  Hashtags,
  Header,
  Infos,
  Options,
  Problem,
  ProblemDropdown,
  ProblemImg,
  ProblemNumber,
  QuestionType,
  Title,
  VisibleToggle,
} from './Style';
import { DIFFICULTY, QUESTION_TYPE } from '../../utils/constants';
import useToggle from '../../hooks/useToggle';

interface QuestionItemProps extends GetQuestionResponse {
  index: number;
}

const QuestionItem = (props: QuestionItemProps) => {
  const { questionId, index, question, hashtags, difficulty, commentary, images, questionType, options, answer } =
    props;
  const isSubjective = questionType === QUESTION_TYPE.subjective;
  const [answerVisible, handleAnswerVisible] = useToggle(false);

  return (
    <ProblemDropdown key={questionId}>
      <Header>
        <ProblemNumber>🔽 {index + 1}번 문제</ProblemNumber>
        <QuestionType type={isSubjective}>{isSubjective ? '📄 주관식' : '🔢 객관식'}</QuestionType>
      </Header>
      <Problem>
        <Title>문제 : {question}</Title>
        <Options>
          {options && options.map((option, idx) => <div key={option}>{`${idx + 1}번 : ${option}`}</div>)}
        </Options>
        <ProblemImg src={images[0]} alt="" />
        <Infos>
          <Hashtags>
            해시태그 :
            {hashtags.map((hashtag) => {
              return <div key={hashtag}>{hashtag}</div>;
            })}
          </Hashtags>

          <VisibleToggle onClick={() => handleAnswerVisible()}>
            <div>정답 및 해설 보기</div>
            {answerVisible && (
              <>
                <Answer>정답 : {answer}</Answer>
                <Commentary>해설 : {commentary}</Commentary>
                <Difficulty>난이도 : {DIFFICULTY[difficulty]}</Difficulty>
              </>
            )}
          </VisibleToggle>
        </Infos>
      </Problem>
    </ProblemDropdown>
  );
};

export default QuestionItem;
