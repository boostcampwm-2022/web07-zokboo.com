import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getTestPaper } from '../../api/testpaper';
import Logo from '../../components/common/logo';
import Header from '../../components/solve/header';
import { Button, Item, List, TextArea } from '../../styles/common';
import { colors, fonts, media } from '../../styles/theme';

const Container = styled.div``;
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 5;

  width: 100%;

  background-color: ${colors.secondary};
  padding: 10px 15px;
`;

export const Inner = styled.div<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? `flex` : `none`)};
`;

export const LogoBox = styled.div`
  width: 30px;
  height: 30px;

  img {
    width: 30px;
    height: 30px;
  }
`;

export const Title = styled.h2`
  margin: 0;
  margin-left: 10px;

  font-size: ${fonts.size.sm};
`;

const sideBarShow = keyframes`
    0% {
        z-index: 3;
        opacity: 0;
        left: -50px;
    }
    100%{
        z-index: 3;
        opacity: 1;
        left: 0px;

    }
`;
const sideBarHidden = keyframes`
    0% {
        z-index: 3;
        opacity: 1;
        left: 0px;
    }
    100%{
        z-index: 3;
        opacity: 0;
        left: -50px;

    }
`;

export const SideBar = styled.div<{ isSideBar: boolean }>`
  position: fixed;
  top: 50px;
  left: 0;

  z-index: 5;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px 20px;

  width: 150px;
  height: 100%;

  overflow-y: auto;

  background-color: ${colors.offWhite};

  ${media.mobileLength} {
    position: fixed;

    z-index: ${(props) => (props.isSideBar ? `3` : `1`)};
    animation: ${(props) => (props.isSideBar ? sideBarShow : sideBarHidden)} 0.5s;
  }
`;

export const SideBarListTitle = styled.h3`
  margin: 0;
`;

export const SideBarList = styled(List)`
  display: flex;
  flex-direction: column;

  width: 100%;

  overflow: initial;
`;
export const SideBarItem = styled(Item)`
  height: 30px;
`;

export const SideBarButton = styled(Button)<{ isActive: boolean }>`
  width: 100%;
  height: 100%;

  ${(props) =>
    props.isActive &&
    `
  background-color: ${colors.primary};
  color: ${colors.white};
`}
`;

export const QuestionContainer = styled.div`
  position: relative;
  z-index: 2;

  background-color: ${colors.white};

  width: calc(100% - 150px);
  height: calc(100vh - 50px);

  padding: 30px 50px;

  overflow-y: auto;
  scroll-behavior: smooth;

  ${media.mobileLength} {
    width: 100%;
    padding: 30px 10px;
  }
`;

export const QuestionList = styled(List)`
  overflow: initial;
`;

export const QuestionItem = styled(Item)`
  margin-bottom: 40px;
`;

export const QuestionBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 15px 0 0;
`;

export const QuestionTitle = styled.h3<{ isWrong: boolean }>`
  margin: 0;
  font-size: ${fonts.size.lg};
  color: ${(props) => (props.isWrong ? colors.error : colors.text)};
`;

export const QuestionMarkBox = styled.div<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? `flex` : `none`)};
  justify-content: space-between;
  align-items: center;

  width: 100px;
`;

export const QuestionMarkButton = styled(Button)<{ kind: string; isActive: boolean }>`
  width: 40px;

  color: ${colors.text};

  border: 1px solid ${colors.text};
  font-size: ${fonts.size.xs};

  ${(props) => props.isActive && `background-color: ${colors.text}; color:${colors.white};`};

  :hover {
    background-color: ${colors.text};
  }
`;

export const QuestionOptionList = styled(List)``;
export const QuestionOptionItem = styled(Item)``;

export const QuestionCheckButton = styled.button<{ isActive: boolean; isWrong: boolean }>`
  border: none;
  background-color: ${colors.white};

  font-size: ${fonts.size.sm};

  ${(props) =>
    props.isActive &&
    `
font-weight: ${fonts.weight.bold}; 
color:${colors.primary};
`}

  ${(props) =>
    props.isWrong &&
    `
font-weight: ${fonts.weight.bold}; 
color:${colors.error};
`}

  cursor: pointer;
`;

export const QuestionAnswerArea = styled(TextArea)`
  margin: 20px 0;
  height: 150px;
`;

export const QuestionButtonList = styled.div`
  display: flex;
`;

export const QuestionAnswerButton = styled.button<{ isActive: boolean }>`
  width: 120px;

  border: none;
  background: none;

  text-align: left;
  font-size: ${fonts.size.sm};

  cursor: pointer;

  ${(props) =>
    props.isActive &&
    `
font-weight: ${fonts.weight.bold}; 
color:${colors.primary};
`}
`;

export const QuestionDescription = styled.pre<{ isActive: boolean }>`
  display: ${(props) => (props.isActive ? `block` : `none`)};

  margin-top: 20px;

  padding: 10px;

  background-color: ${colors.offWhite};
  border-radius: 10px;
`;

export const QuestionAnswerContainer = styled.div<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? `block` : `none`)};
`;

export const MobileSideBarShowButton = styled(Button)`
  position: fixed;
  right: 20px;
  bottom: 20px;

  z-index: 4;

  display: none;

  width: 40px;
  height: 40px;

  border-radius: 50%;

  ${media.mobileLength} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const TestButtonContainer = styled.div<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? `flex` : `none`)};
  justify-content: center;

  width: 100%;
`;

export const TestButton = styled(Button)`
  padding: 5px 20px;
`;

export const QuestionImage = styled.img`
  display: ${(props) => (props.src ? `block` : `none`)};

  width: 320px;
  height: 240px;

  margin: 5px 0 0;
`;

const Review = () => {
  const { id } = useParams<{ id: string }>();
  const [isSideBar, setIsSideBar] = useState<boolean>(false);
  const [questions, setQuestions] = useState([]);
  const { data, isSuccess } = useQuery(['review', id], getTestPaper, {
    onSuccess: (d) => {
      setQuestions(d.data.questions);
    },
  });

  return (
    <Container>
      <HeaderContainer>
        <Inner isShow>
          <LogoBox>
            <Logo type="small" />
          </LogoBox>
          <Title>title</Title>
        </Inner>
      </HeaderContainer>
      <SideBar isSideBar={isSideBar}>
        <SideBarListTitle>문제 목록</SideBarListTitle>
        <SideBarList>
          {questions.map(({ questionId }, idx) => (
            <SideBarItem key={questionId}>
              <SideBarButton isActive={false}>{idx + 1}</SideBarButton>
            </SideBarItem>
          ))}
        </SideBarList>
      </SideBar>
    </Container>
  );
};

export default Review;
