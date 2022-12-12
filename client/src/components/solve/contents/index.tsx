import { useRef, useState } from 'react';
import { BsFillCaretDownFill, BsList } from 'react-icons/bs';
import { useMutation } from 'react-query';
import { solveWorkbookQuestion } from '../../../api/workbook';
import useToggle from '../../../hooks/useToggle';
import DESCRIPTION_TYPE from '../../../pages/workbook/constants';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateAnswer } from '../../../redux/solve/slice';
import selectSolveData from '../../../redux/solve/selector';
import { QUESTION_TYPE, SOLVE_TYPE } from '../../../utils/constants';
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
  TestButton,
  TestButtonContainer,
} from './Style';

interface Props {
  handleTestGrade: () => void;
}

const Contents = ({ handleTestGrade }: Props) => {
  const { questions, id, type, answerList } = useAppSelector(selectSolveData);
  const dispatch = useAppDispatch();

  const [IsSideBar, handleIsSideBarChange] = useToggle(false);
  const contentsRef = useRef<HTMLDivElement>(null);
  const questionItemRef = useRef<HTMLLIElement[]>([]);
  const [descriptionType, setDescriptionType] = useState<string[]>(new Array(questions.length).fill(''));

  const solveWorkbookQuestionMutation = useMutation(solveWorkbookQuestion);

  const checkSolveType = () => {
    return {
      isWorkbook: type === SOLVE_TYPE.workbook,
      isTest: type === SOLVE_TYPE.test,
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
        testPaperQuestionId: questionId,
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
                      <QuestionOptionItem key={`${questionId}-${option}`}>
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

        <TestButtonContainer isShow={solveType.isTest}>
          <TestButton onClick={handleTestGrade}>시험 종료</TestButton>
        </TestButtonContainer>
      </QuestionContainer>

      <MobileSideBarShowButton onClick={handleIsSideBarChange}>
        <BsList />
      </MobileSideBarShowButton>
    </Container>
  );
};

export default Contents;
