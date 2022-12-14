import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import React, { useCallback } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { GetQuestionResponse } from '../../types/question';
import {
  Answer,
  Commentary,
  Difficulty,
  Hashtags,
  Header,
  Heart,
  Infos,
  Options,
  Problem,
  ProblemDropdown,
  ProblemImg,
  ProblemNumber,
  QuestionType,
  Title,
  TitleContainer,
  VisibleToggle,
} from './Style';
import { DIFFICULTY, QUESTION_TYPE } from '../../utils/constants';
import useToggle from '../../hooks/useToggle';
import { postQuestionDisLike, postQuestionLike } from '../../api/like';

interface QuestionItemProps extends GetQuestionResponse {
  index: number;
}

const QuestionItem = (props: QuestionItemProps) => {
  const { questionId, index, question, hashtags, difficulty, commentary, images, questionType, options, answer } =
    props;
  const isSubjective = questionType === QUESTION_TYPE.subjective;
  const [answerVisible, handleAnswerVisible] = useToggle(false);
  const [isLike, setIsLike] = useToggle(false);
  const { mutate: likeMutate } = useMutation(postQuestionLike, {
    onSuccess: (d) => {
      toast.success('👍 좋아요를 눌렀습니다.');
      setIsLike();
    },
  });
  const { mutate: dislikeMutate } = useMutation(postQuestionDisLike, {
    onSuccess: (d) => {
      toast.success('👎 좋아요를 취소하였습니다.');
      setIsLike();
    },
  });

  const handleIsLike = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isLike) {
      dislikeMutate(questionId);
    } else {
      likeMutate(questionId);
    }
  }, []);

  return (
    <ProblemDropdown key={questionId}>
      <Header>
        <ProblemNumber>🔽 {index + 1}번 문제</ProblemNumber>
        <QuestionType type={isSubjective}>{isSubjective ? '📄 주관식' : '🔢 객관식'}</QuestionType>
      </Header>
      <Problem>
        <TitleContainer>
          <Title>문제 : {question}</Title>
          <Heart type="button" onClick={handleIsLike}>
            {isLike ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
          </Heart>
        </TitleContainer>
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
