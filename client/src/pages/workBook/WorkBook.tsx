import { BsFillCaretDownFill, BsList } from 'react-icons/bs';
import Logo from '../../components/common/logo';
import useToggle from '../../hooks/useToggle';
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
  const [IsSideBar, handleIsSideBarChange] = useToggle(false);

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
            <SideBarItem>
              <SideBarButton>1</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>2</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>3</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>4</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>5</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>6</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>7</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>8</SideBarButton>
            </SideBarItem>
            <SideBarItem>
              <SideBarButton>9</SideBarButton>
            </SideBarItem>
          </SideBarList>
        </SideBar>
        <Contents>
          <QuestionList>
            <QuestionItem>
              <QuestionTitle>1. 이것은 지문입니다</QuestionTitle>
              <QuestionOptionList>
                <QuestionOptionItem>
                  <QuestionCheckButton isActive>1. 선택지 1입니다.</QuestionCheckButton>
                </QuestionOptionItem>
                <QuestionOptionItem>
                  <QuestionCheckButton isActive={false}>2. 선택지 2입니다.</QuestionCheckButton>
                </QuestionOptionItem>
                <QuestionOptionItem>
                  <QuestionCheckButton isActive={false}>3. 선택지 3입니다.</QuestionCheckButton>
                </QuestionOptionItem>
                <QuestionOptionItem>
                  <QuestionCheckButton isActive={false}>4. 선택지 4입니다.</QuestionCheckButton>
                </QuestionOptionItem>
                <QuestionOptionItem>
                  <QuestionCheckButton isActive={false}>5. 선택지 5입니다.</QuestionCheckButton>
                </QuestionOptionItem>
              </QuestionOptionList>

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

            <QuestionItem>
              <QuestionTitle>2. 이것은 지문입니다</QuestionTitle>

              <QuestionAnswerArea />

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
