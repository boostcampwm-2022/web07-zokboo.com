import { useState } from 'react';
import MainTitle from '../../components/common/mainTitle/MainTitle';
import Toggle from '../../components/common/Toggle';
import Modal from '../../components/modal';
import useToggle from '../../hooks/useToggle';
import { SubTitle } from '../../styles/common';
import {
  ProblemItem,
  ProblemItemButton,
  ProblemItemHashTagItem,
  ProblemItemHashTagList,
  ProblemItemTitle,
  ProblemItemUnderLine,
  ProblemList,
} from '../../styles/problemList';
import { Problem } from '../../types/workbook';
import {
  ListButton,
  ButtonList,
  Container,
  Form,
  FormButton,
  FormInput,
  FormItem,
  FormToggle,
  ProblemListContainer,
  FormTextArea,
} from './Style';

const WorkBookCreate = () => {
  const [isCreateModal, onCreateModalToggle] = useToggle(false);
  const [isSearchModal, onSearchModalToggle] = useToggle(false);

  const [problemList, setProblemList] = useState<Problem[]>([]);

  const handleProblemAdd = (problem: Problem) => {
    setProblemList((prev) => [...prev, problem]);
  };

  const handleProblemDelete = (index: number) => {
    const updateProblemList = problemList.filter((_, idx) => idx !== index);
    setProblemList(updateProblemList);
  };

  return (
    <>
      <MainTitle title="문제집 만들기" />
      <Container>
        <Form>
          <FormItem>
            <SubTitle>문제집 제목</SubTitle>
            <FormInput type="text" id="title" placeholder="문제집 제목을 입력하세요." />
          </FormItem>
          <FormItem>
            <SubTitle>문제집 설명</SubTitle>
            <FormTextArea id="category" placeholder="문제집 설명을 입력하세요." />
          </FormItem>
          <FormItem>
            <SubTitle>공유</SubTitle>
            <FormToggle>
              <Toggle />
            </FormToggle>
          </FormItem>

          <FormButton>문제집 생성</FormButton>
        </Form>

        <ProblemListContainer>
          <ButtonList>
            <ListButton onClick={onSearchModalToggle}>문제 검색</ListButton>
            <ListButton onClick={onCreateModalToggle}>문제 추가</ListButton>
          </ButtonList>

          <ProblemList>
            {problemList.map((problem, idx) => {
              const { questionId, question, hashtags } = problem;

              return (
                <ProblemItem key={questionId}>
                  <ProblemItemTitle>{question}</ProblemItemTitle>
                  <ProblemItemUnderLine>
                    <ProblemItemHashTagList>
                      {hashtags.map((hashtag) => (
                        <ProblemItemHashTagItem key={hashtag}>{hashtag}</ProblemItemHashTagItem>
                      ))}
                    </ProblemItemHashTagList>
                    <ProblemItemButton onClick={() => handleProblemDelete(idx)}>제거</ProblemItemButton>
                  </ProblemItemUnderLine>
                </ProblemItem>
              );
            })}
          </ProblemList>
        </ProblemListContainer>
      </Container>

      {isCreateModal && <Modal type="create" onToggle={onCreateModalToggle} handleProblemAdd={handleProblemAdd} />}
      {isSearchModal && <Modal type="search" onToggle={onSearchModalToggle} handleProblemAdd={handleProblemAdd} />}
    </>
  );
};

export default WorkBookCreate;
