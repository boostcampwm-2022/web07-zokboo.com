import { useRef, useState } from 'react';
import { BsFillCaretDownFill, BsList } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getWorkbookList } from '../../api/workbook';
import Logo from '../../components/common/logo';
import useArrayText from '../../hooks/useArrayText';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import KEYS from '../../react-query/keys/workbook';
import { GetWorkBookListResponse } from '../../types/workbook';
import { QUESTION_TYPE } from '../../utils/constants';
import DESCRIPTION_TYPE from './constants';
import {
  Container,
  Contents,
  ContentsContainer,
  Header,
  HeaderInner,
  HeaderLogo,
  HeaderTitle,
  SideBarItem,
  SideBarList,
  SideBarListTitle,
  SideBar,
  SideBarButton,
  QuestionList,
  QuestionItem,
  QuestionTitle,
  QuestionOptionList,
  QuestionOptionItem,
  QuestionCheckButton,
  QuestionAnswerButton,
  QuestionButtonList,
  QuestionDescription,
  QuestionAnswerArea,
  MobileSideBarShowButton,
} from './Style';

const WorkBook = () => {
  const { id } = useParams<{ id: string }>();
  const [IsSideBar, handleIsSideBarChange] = useToggle(false);
  const contentsRef = useRef<HTMLDivElement>(null);
  const questionItemRef = useRef<HTMLLIElement[]>([]);

  const [descriptionType, setDescriptionType] = useState<string[]>([]);

  const { values: answerList, addMulti: initAnswerList, change: handleAnswerListUpdate } = useArrayText();

  const { data } = useQuery<GetWorkBookListResponse>(
    KEYS.detail,
    () => {
      const workbookId = id ?? '';
      return getWorkbookList(workbookId);
    },
    {
      onSuccess: (workbooks: GetWorkBookListResponse) => {
        setDescriptionType(new Array(workbooks.questions.length).fill(''));
        initAnswerList(workbooks.questions.length);
      },
    },
  );

  const handleScrollMove = (idx: number) => {
    const contentContainer = contentsRef.current;
    const questionItem = questionItemRef.current;

    if (contentContainer) contentContainer.scrollTop = questionItem[idx].offsetTop - 30;
  };

  const handleDescriptionTypeSelect = (index: number, type: string) => {
    const prevDescriptionType = descriptionType[index];
    let updateType = ``;

    if (prevDescriptionType !== type) updateType = type;

    setDescriptionType((prev) => prev.map((prevType, idx) => (idx !== index ? prevType : updateType)));
  };

  const checkDescriptionType = (idx: number, type: string) => {
    if (descriptionType[idx] === type) return true;
    return false;
  };

  if (!data) return <div>Loading</div>;

  return (
    <Container>
      <Header>
        <HeaderInner>
          <HeaderLogo>
            <Logo type="small" />
          </HeaderLogo>
          <HeaderTitle>문제집 명</HeaderTitle>
        </HeaderInner>
      </Header>
      <ContentsContainer>
        <SideBar isSideBar={IsSideBar}>
          <SideBarListTitle>문제 목록</SideBarListTitle>
          <SideBarList>
            {data.questions.map(({ questionId }, idx) => (
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

        <Contents ref={contentsRef}>
          <QuestionList>
            {data.questions.map((questionData, idx) => {
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
                  <QuestionTitle>{question}</QuestionTitle>
                  {questionType === QUESTION_TYPE.MULTIPLE ? (
                    <QuestionOptionList>
                      {options.map((option) => (
                        <QuestionOptionItem key={option}>
                          <QuestionCheckButton
                            isActive={answerList[idx] === option}
                            onClick={() => handleAnswerListUpdate(idx, option)}
                          >
                            {option}
                          </QuestionCheckButton>
                        </QuestionOptionItem>
                      ))}
                    </QuestionOptionList>
                  ) : (
                    <QuestionAnswerArea onChange={(e) => handleAnswerListUpdate(idx, e.target.value)} />
                  )}
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
                </QuestionItem>
              );
            })}
          </QuestionList>
        </Contents>

        <MobileSideBarShowButton onClick={handleIsSideBarChange}>
          <BsList />
        </MobileSideBarShowButton>
      </ContentsContainer>
    </Container>
  );
};

export default WorkBook;
