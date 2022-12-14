import { useRef, useState } from 'react';
import { BsFillCaretDownFill } from '@react-icons/all-files/bs/BsFillCaretDownFill';
import { BsList } from '@react-icons/all-files/bs/BsList';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { solveWorkbookQuestion } from '../../../api/workbook';
import useToggle from '../../../hooks/useToggle';
import DESCRIPTION_TYPE from '../../../pages/workbook/constants';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { updateAnswer, updateGradeQuestion, updateMark } from '../../../redux/solve/slice';
import selectSolveData from '../../../redux/solve/selector';
import { QUESTION_TYPE, SERVICE_ROUTE, SOLVE_TYPE, TEST_QUESTION_TYPE, TEST_TYPE } from '../../../utils/constants';
import {
  Container,
  MobileSideBarShowButton,
  QuestionAnswerArea,
  QuestionAnswerButton,
  QuestionAnswerContainer,
  QuestionBox,
  QuestionButtonList,
  QuestionCheckButton,
  QuestionContainer,
  QuestionDescription,
  QuestionImage,
  QuestionItem,
  QuestionList,
  QuestionMarkBox,
  QuestionMarkButton,
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
import TEST_BUTTON_TEXT from './contants';
import { markGradeTestPaper } from '../../../api/testpaper';
import { GetGradeTestPaperResponse } from '../../../types/test';

interface Props {
  handleTestGrade: () => void;
}

const Contents = ({ handleTestGrade }: Props) => {
  const { questions, id, type, answerList, state, markList } = useAppSelector(selectSolveData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [IsSideBar, handleIsSideBarChange] = useToggle(false);
  const contentsRef = useRef<HTMLDivElement>(null);
  const questionItemRef = useRef<HTMLLIElement[]>([]);
  const [descriptionType, setDescriptionType] = useState<string[]>(new Array(questions.length).fill(''));

  const solveWorkbookQuestionMutation = useMutation(solveWorkbookQuestion);
  const markGradeTestMutation = useMutation(markGradeTestPaper);

  const getTestButtonText = () => {
    return TEST_BUTTON_TEXT[state];
  };

  const buttonText = getTestButtonText();

  const checkSolveType = () => {
    return {
      isWorkbook: type === SOLVE_TYPE.workbook,
      isTest: type === SOLVE_TYPE.test,
    };
  };

  const checkTestType = () => {
    return {
      isSolve: state === TEST_TYPE.solve,
      isGrading: state === TEST_TYPE.grade,
      isComplete: state === TEST_TYPE.complete,
    };
  };

  const solveType = checkSolveType();
  const testType = checkTestType();

  const checkDescriptionType = (idx: number, descType: string) => {
    if (descriptionType[idx] === descType) return true;
    return false;
  };

  const handleQuestionSolve = (questionId: number, value: string) => {
    if (!(testType.isGrading || testType.isComplete)) {
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
    }
  };

  const handleMarkUpdate = (questionId: number, isCorrect: boolean) => {
    dispatch(
      updateMark({
        testPaperQuestionId: questionId,
        isCorrect,
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

  const handleMarkTestGrade = () => {
    const subjectQuestions = markList
      .filter(({ questionType }) => questionType === QUESTION_TYPE.subjective)
      .map(({ testPaperQuestionId, isCorrect }) => ({
        testPaperQuestionId,
        isCorrect,
      }));

    markGradeTestMutation.mutate(
      {
        testPaperId: id,
        body: { questions: subjectQuestions },
      },
      {
        onSuccess: ({ data }: GetGradeTestPaperResponse) => {
          toast.success('????????? ????????? ?????????????????????.');
          navigate(`/mypage?service=${SERVICE_ROUTE.test}`);
          dispatch(
            updateGradeQuestion({
              questions: data.questions.map((question) => ({
                ...question,
                questionId: question.testPaperQuestionId,
              })),
              state: data.state,
            }),
          );
        },
      },
    );
  };

  const handleTestEndButtonClick = () => {
    if (testType.isSolve) handleTestGrade();
    else handleMarkTestGrade();
  };

  return (
    <Container>
      <SideBar isSideBar={IsSideBar}>
        <SideBarListTitle>?????? ??????</SideBarListTitle>
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
            const {
              questionId,
              question,
              questionType,
              commentary,
              answer,
              options,
              state: questionState,
              images,
            } = questionData;
            const isAnswer = checkDescriptionType(idx, DESCRIPTION_TYPE.answer);
            const isComment = checkDescriptionType(idx, DESCRIPTION_TYPE.comment);
            const isWrong = !testType.isSolve && questionState === TEST_QUESTION_TYPE.wrong;

            return (
              <QuestionItem
                key={questionId}
                ref={(el) => {
                  if (el) questionItemRef.current[idx] = el;
                }}
              >
                <QuestionBox>
                  <QuestionTitle isWrong={isWrong}>
                    {`${idx + 1}. `}
                    {question}
                  </QuestionTitle>

                  <QuestionMarkBox isShow={questionType === QUESTION_TYPE.subjective && testType.isGrading}>
                    <QuestionMarkButton
                      kind="correct"
                      isActive={markList[idx].isCorrect}
                      onClick={() => handleMarkUpdate(questionId, true)}
                    >
                      ??????
                    </QuestionMarkButton>
                    <QuestionMarkButton
                      kind="wrong"
                      isActive={!markList[idx].isCorrect}
                      onClick={() => handleMarkUpdate(questionId, false)}
                    >
                      ??????
                    </QuestionMarkButton>
                  </QuestionMarkBox>
                </QuestionBox>
                <QuestionImage src={images[0]} alt="question" />
                {questionType === QUESTION_TYPE.multiple ? (
                  <QuestionOptionList>
                    {options.map((option) => (
                      <QuestionOptionItem key={`${questionId}-${option}`}>
                        <QuestionCheckButton
                          isActive={answerList[idx]?.writtenAnswer === option}
                          isWrong={isWrong && option === answer}
                          onClick={() => handleQuestionSolve(questionId, option)}
                        >
                          {option}
                        </QuestionCheckButton>
                      </QuestionOptionItem>
                    ))}
                  </QuestionOptionList>
                ) : (
                  <QuestionAnswerArea
                    value={answerList[idx]?.writtenAnswer}
                    onChange={(e) => handleQuestionSolve(questionId, e.target.value)}
                    readOnly={testType.isGrading || testType.isComplete}
                    placeholder="????????? ??????????????????."
                  />
                )}

                <QuestionAnswerContainer isShow={solveType.isWorkbook || !testType.isSolve}>
                  <QuestionButtonList>
                    <QuestionAnswerButton
                      isActive={isAnswer}
                      onClick={() => handleDescriptionTypeSelect(idx, DESCRIPTION_TYPE.answer)}
                    >
                      <BsFillCaretDownFill /> ?????? ??????
                    </QuestionAnswerButton>
                    <QuestionAnswerButton
                      isActive={isComment}
                      onClick={() => handleDescriptionTypeSelect(idx, DESCRIPTION_TYPE.comment)}
                    >
                      <BsFillCaretDownFill /> ?????? ??????
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

        <TestButtonContainer isShow={testType.isSolve || testType.isGrading}>
          <TestButton onClick={handleTestEndButtonClick}>{buttonText}</TestButton>
        </TestButtonContainer>
      </QuestionContainer>

      <MobileSideBarShowButton onClick={handleIsSideBarChange}>
        <BsList />
      </MobileSideBarShowButton>
    </Container>
  );
};

export default Contents;
