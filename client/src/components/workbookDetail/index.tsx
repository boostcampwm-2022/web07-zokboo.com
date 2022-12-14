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
      toast.success('π μ’μμλ₯Ό λλ μ΅λλ€.');
      setIsLike();
    },
  });
  const { mutate: dislikeMutate } = useMutation(postQuestionDisLike, {
    onSuccess: (d) => {
      toast.success('π μ’μμλ₯Ό μ·¨μνμμ΅λλ€.');
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
        <ProblemNumber>π½ {index + 1}λ² λ¬Έμ </ProblemNumber>
        <QuestionType type={isSubjective}>{isSubjective ? 'π μ£Όκ΄μ' : 'π’ κ°κ΄μ'}</QuestionType>
      </Header>
      <Problem>
        <TitleContainer>
          <Title>λ¬Έμ  : {question}</Title>
          <Heart type="button" onClick={handleIsLike}>
            {isLike ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
          </Heart>
        </TitleContainer>
        <Options>
          {options && options.map((option, idx) => <div key={option}>{`${idx + 1}λ² : ${option}`}</div>)}
        </Options>
        <ProblemImg src={images[0]} alt="" />
        <Infos>
          <Hashtags>
            ν΄μνκ·Έ :
            {hashtags.map((hashtag) => {
              return <div key={hashtag}>{hashtag}</div>;
            })}
          </Hashtags>

          <VisibleToggle onClick={() => handleAnswerVisible()}>
            <div>μ λ΅ λ° ν΄μ€ λ³΄κΈ°</div>
            {answerVisible && (
              <>
                <Answer>μ λ΅ : {answer}</Answer>
                <Commentary>ν΄μ€ : {commentary}</Commentary>
                <Difficulty>λμ΄λ : {DIFFICULTY[difficulty]}</Difficulty>
              </>
            )}
          </VisibleToggle>
        </Infos>
      </Problem>
    </ProblemDropdown>
  );
};

export default QuestionItem;
