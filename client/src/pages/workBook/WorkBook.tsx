import { useRef } from 'react';
import { BsFillCaretDownFill, BsList } from 'react-icons/bs';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getWorkbookList } from '../../api/workbook';
import Logo from '../../components/common/logo';
import useToggle from '../../hooks/useToggle';
import KEYS from '../../react-query/keys/workbook';
import { GetWorkBookListResponse } from '../../types/workbook';
import { QUESTION_TYPE } from '../../utils/constants';
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

  const { data } = useQuery<GetWorkBookListResponse>(KEYS.detail, () => {
    const workbookId = id ?? '';
    return getWorkbookList(workbookId);
  });

  const handleScrollMove = (idx: number) => {
    const contentContainer = contentsRef.current;
    const questionItem = questionItemRef.current;

    if (contentContainer) contentContainer.scrollTop = questionItem[idx].offsetTop - 30;
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
            {data.questions.map(({ questionId }, idx) => {
              return (
                <SideBarItem key={questionId}>
                  <SideBarButton
                    onClick={() => {
                      handleScrollMove(idx);
                    }}
                  >
                    {idx + 1}
                  </SideBarButton>
                </SideBarItem>
              );
            })}
          </SideBarList>
        </SideBar>
        <Contents ref={contentsRef}>
          <QuestionList>
            {data.questions.map((questionData, idx) => {
              const { questionId, question, questionType, commentary, answer, options } = questionData;
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
                          <QuestionCheckButton isActive={false}>{option}</QuestionCheckButton>
                        </QuestionOptionItem>
                      ))}
                    </QuestionOptionList>
                  ) : (
                    <QuestionAnswerArea />
                  )}
                  <QuestionButtonList>
                    <QuestionAnswerButton isActive>
                      <BsFillCaretDownFill /> 정답 보기
                    </QuestionAnswerButton>
                    <QuestionAnswerButton isActive={false}>
                      <BsFillCaretDownFill /> 해설 보기
                    </QuestionAnswerButton>
                  </QuestionButtonList>

                  <QuestionDescription>123</QuestionDescription>
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
