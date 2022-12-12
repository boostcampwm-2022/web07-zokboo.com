import { useEffect, useRef, useState } from 'react';
import { BsFillCaretDownFill, BsList } from 'react-icons/bs';
import { useMutation } from 'react-query';
import { solveWorkbookQuestion } from '../../../api/workbook';
import useArrayText from '../../../hooks/useArrayText';
import useToggle from '../../../hooks/useToggle';
import DESCRIPTION_TYPE from '../../../pages/workbook/constants';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { initAnswer, updateAnswer } from '../../../redux/solve/slice';
import selectSolveData from '../../../redux/solve/selector';
import { QUESTION_TYPE } from '../../../utils/constants';
import {
  Container,
  MobileSideBarShowButton,
  QuestionAnswerArea,
  QuestionAnswerButton,
  QuestionAnswerContainer,
  QuestionButtonList,
  QuestionCheckButton,
  QuestionContainer,
  QuestionDescription,
  QuestionItem,
  QuestionList,
  QuestionOptionItem,
  QuestionOptionList,
  QuestionTitle,
  SideBar,
  SideBarButton,
  SideBarItem,
  SideBarList,
  SideBarListTitle,
} from './Style';
import Loading from '../../common/Loading';
import TYPE from '../../../types/solve';

const Contents = () => {
  const { questions, id, type, answerList } = useAppSelector(selectSolveData);
  const dispatch = useAppDispatch();

  const [IsSideBar, handleIsSideBarChange] = useToggle(false);
  const contentsRef = useRef<HTMLDivElement>(null);
  const questionItemRef = useRef<HTMLLIElement[]>([]);
  const [descriptionType, setDescriptionType] = useState<string[]>([]);

  const solveWorkbookQuestionMutation = useMutation(solveWorkbookQuestion);

  console.log(answerList);

  const checkSolveType = () => {
    return {
      isWorkbook: type === TYPE.workbook,
      isTest: type === TYPE.test,
    };
  };

  const solveType = checkSolveType();

  const checkDescriptionType = (idx: number, descType: string) => {
    if (descriptionType[idx] === descType) return true;
    return false;
  };

  const handleWorkbookQuestionSolve = (questionId: number, value: string) => {
    if (solveType.isWorkbook) {
      solveWorkbookQuestionMutation.mutate({
        params: { workbookId: id, workbookQuestionId: questionId },
        body: { newAnswer: value },
      });
    }
    dispatch(
      updateAnswer({
        questionId,
        writtenAnswer: value,
      }),
    );
  };

  const handleScrollMove = (idx: number) => {
    const contentContainer = contentsRef.current;
    const questionItem = questionItemRef.current;

    if (contentContainer) contentContainer.scrollTop = questionItem[idx].offsetTop - 30;
  };

  const handleDescriptionTypeSelect = (index: number, descType: string) => {
    const prevDescriptionType = descriptionType[index];
    let updateType = ``;

    if (prevDescriptionType !== descType) updateType = descType;

    setDescriptionType((prev) => prev.map((prevType, idx) => (idx !== index ? prevType : updateType)));
  };

  useEffect(() => {
    if (questions) {
      setDescriptionType(new Array(questions.length).fill(''));

      const dumpAnswerList = questions.map(({ questionId, writtenAnswer, questionType }) => ({
        questionId,
        writtenAnswer: writtenAnswer ?? '',
        questionType,
      }));

      dispatch(initAnswer(dumpAnswerList));
    }
  }, [questions]);

  if (!answerList) return <Loading />;

  return (
    <Container>
      <SideBar isSideBar={IsSideBar}>
        <SideBarListTitle>문제 목록</SideBarListTitle>
        <SideBarList>
          {questions.map(({ questionId }, idx) => (
            <SideBarItem key={questionId}>
              <SideBarButton
                isActive={answerList[idx]?.writtenAnswer !== ``}
                onClick={() => {
                  handleScrollMove(idx);
                }}
              >
                {idx + 1}
              </SideBarButton>
            </SideBarItem>
          ))}
        </SideBarList>
      </SideBar>

      <QuestionContainer ref={contentsRef}>
        <QuestionList>
          {questions.map((questionData, idx) => {
            const { questionId, question, questionType, commentary, answer, options } = questionData;
            const isAnswer = checkDescriptionType(idx, DESCRIPTION_TYPE.answer);
            const isComment = checkDescriptionType(idx, DESCRIPTION_TYPE.comment);
            return (
              <QuestionItem
                key={questionId}
                ref={(el) => {
                  if (el) questionItemRef.current[idx] = el;
                }}
              >
                <QuestionTitle>
                  {`${idx + 1}. `}
                  {question}
                </QuestionTitle>
                {questionType === QUESTION_TYPE.multiple ? (
                  <QuestionOptionList>
                    {options.map((option) => (
                      <QuestionOptionItem key={option}>
                        <QuestionCheckButton
                          isActive={answerList[idx]?.writtenAnswer === option}
                          onClick={() => handleWorkbookQuestionSolve(questionId, option)}
                        >
                          {option}
                        </QuestionCheckButton>
                      </QuestionOptionItem>
                    ))}
                  </QuestionOptionList>
                ) : (
                  <QuestionAnswerArea
                    value={answerList[idx]?.writtenAnswer}
                    onChange={(e) => handleWorkbookQuestionSolve(questionId, e.target.value)}
                  />
                )}

                <QuestionAnswerContainer isShow={solveType.isWorkbook}>
                  <QuestionButtonList>
                    <QuestionAnswerButton
                      isActive={isAnswer}
                      onClick={() => handleDescriptionTypeSelect(idx, DESCRIPTION_TYPE.answer)}
                    >
                      <BsFillCaretDownFill /> 정답 보기
                    </QuestionAnswerButton>
                    <QuestionAnswerButton
                      isActive={isComment}
                      onClick={() => handleDescriptionTypeSelect(idx, DESCRIPTION_TYPE.comment)}
                    >
                      <BsFillCaretDownFill /> 해설 보기
                    </QuestionAnswerButton>
                  </QuestionButtonList>

                  <QuestionDescription isActive={isAnswer || isComment}>
                    {descriptionType[idx] === DESCRIPTION_TYPE.answer ? answer : commentary}
                  </QuestionDescription>
                </QuestionAnswerContainer>
              </QuestionItem>
            );
          })}
        </QuestionList>
      </QuestionContainer>

      <MobileSideBarShowButton onClick={handleIsSideBarChange}>
        <BsList />
      </MobileSideBarShowButton>
    </Container>
  );
};

export default Contents;
