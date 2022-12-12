import { useEffect, useRef, useState } from 'react';
import { BsFillCaretDownFill, BsList } from 'react-icons/bs';
import { useMutation } from 'react-query';
import { solveWorkbookQuestion } from '../../../api/workbook';
import useArrayText from '../../../hooks/useArrayText';
import useToggle from '../../../hooks/useToggle';
import DESCRIPTION_TYPE from '../../../pages/workbook/constants';
import { useAppSelector } from '../../../redux/hooks';
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

const Contents = () => {
  const { questions, id, type } = useAppSelector(selectSolveData);

  const [IsSideBar, handleIsSideBarChange] = useToggle(false);
  const contentsRef = useRef<HTMLDivElement>(null);
  const questionItemRef = useRef<HTMLLIElement[]>([]);
  const [descriptionType, setDescriptionType] = useState<string[]>([]);
  const { values: answerList, set: initAnswerList, change: handleAnswerListUpdate } = useArrayText();

  const solveWorkbookQuestionMutation = useMutation(solveWorkbookQuestion);

  const checkSolveType = () => {
    return {
      isWorkbook: type === 'workbook',
      isTest: type === 'test',
    };
  };

  const solveType = checkSolveType();

  const checkDescriptionType = (idx: number, descType: string) => {
    if (descriptionType[idx] === descType) return true;
    return false;
  };

  const handleWorkbookQuestionSolve = (questionId: number, idx: number, value: string) => {
    if (solveType.isWorkbook) {
      solveWorkbookQuestionMutation.mutate({
        params: { workbookId: id, workbookQuestionId: questionId },
        body: { newAnswer: value },
      });
    }
    handleAnswerListUpdate(idx, value);
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

      const dumpAnswerList = questions.map(({ writtenAnswer }) => writtenAnswer ?? '');
      initAnswerList(dumpAnswerList);
    }
  }, [questions]);

  return (
    <Container>
      <SideBar isSideBar={IsSideBar}>
        <SideBarListTitle>문제 목록</SideBarListTitle>
        <SideBarList>
          {questions.map(({ questionId }, idx) => (
            <SideBarItem key={questionId}>
              <SideBarButton
                isActive={answerList[idx] !== ``}
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
                          isActive={answerList[idx] === option}
                          onClick={() => handleWorkbookQuestionSolve(questionId, idx, option)}
                        >
                          {option}
                        </QuestionCheckButton>
                      </QuestionOptionItem>
                    ))}
                  </QuestionOptionList>
                ) : (
                  <QuestionAnswerArea
                    value={answerList[idx]}
                    onChange={(e) => handleWorkbookQuestionSolve(questionId, idx, e.target.value)}
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
