import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import createWorkbook from '../../api/workbook';
import MainTitle from '../../components/common/mainTitle/MainTitle';
import Toggle from '../../components/common/Toggle';
import Modal from '../../components/modal';
import useInput from '../../hooks/useInput';
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
import { Question } from '../../types/question';
import {
  ListButton,
  ButtonList,
  Container,
  InfoContainer,
  InfoButton,
  InfoInput,
  InfoItem,
  InfoToggle,
  ProblemListContainer,
  InfoTextArea,
} from './Style';

const WorkBookCreate = () => {
  const [isCreateModal, onCreateModalToggle] = useToggle(false);
  const [isSearchModal, onSearchModalToggle] = useToggle(false);

  const [titleInput, handleTitleChange, t_, handleTitleReset] = useInput('');
  const [descriptionInput, handleDescriptionChange, d_, handleDescriptionReset] = useInput('');
  const [isPublic, handlePublicChange] = useToggle(false);

  const [problemList, setProblemList] = useState<Question[]>([]);

  const workbookCreate = useMutation(createWorkbook);

  const handleProblemAdd = (problem: Question) => {
    const listFilter = problemList.filter((currProblem) => problem === currProblem);

    if (listFilter.length === 0) setProblemList((prev) => [...prev, problem]);
  };

  const handleProblemDelete = (index: number) => {
    const updateProblemList = problemList.filter((_, idx) => idx !== index);
    setProblemList(updateProblemList);
  };

  const handleFormReset = () => {
    handleTitleReset();
    handleDescriptionReset();
    setProblemList([]);
  };

  const handleWorkbookCreate = () => {
    if (!titleInput || titleInput.trim() === '') {
      console.log('문제집 제목 오류');
      return;
    }
    if (!descriptionInput || descriptionInput.trim() === '') {
      console.log('문제집 설명 오류');
      return;
    }

    if (problemList.length === 0) {
      console.log('문제 등록 오류');
      return;
    }

    const questions = problemList.map(({ questionId }) => questionId);

    workbookCreate.mutate(
      {
        title: titleInput,
        description: descriptionInput,
        questions,
        isPublic,
      },
      {
        onSuccess: () => {
          handleFormReset();
          toast.success('문제집을 추가하였습니다.');
        },
      },
    );
  };

  return (
    <>
      <MainTitle title="문제집 만들기" />
      <Container>
        <InfoContainer>
          <InfoItem>
            <SubTitle>문제집 제목</SubTitle>
            <InfoInput
              type="text"
              id="title"
              placeholder="문제집 제목을 입력하세요."
              value={titleInput}
              onChange={handleTitleChange}
            />
          </InfoItem>
          <InfoItem>
            <SubTitle>문제집 설명</SubTitle>
            <InfoTextArea
              id="category"
              placeholder="문제집 설명을 입력하세요."
              value={descriptionInput}
              onChange={handleDescriptionChange}
            />
          </InfoItem>
          <InfoItem>
            <SubTitle>공유</SubTitle>
            <InfoToggle>
              <Toggle checked={isPublic} setToggle={handlePublicChange} />
            </InfoToggle>
          </InfoItem>

          <InfoButton onClick={handleWorkbookCreate}>문제집 생성</InfoButton>
        </InfoContainer>

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