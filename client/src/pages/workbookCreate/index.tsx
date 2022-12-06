import { useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createWorkbook } from '../../api/workbook';
import MainTitle from '../../components/common/mainTitle/MainTitle';
import Toggle from '../../components/common/Toggle';
import Modal from '../../components/modal';
import CreateProblemModal from '../../components/modal/createQuestion';
import SearchProblemModal from '../../components/modal/searchQuestion';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import useUserData from '../../hooks/useUserData';
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
import { AddQuestion } from '../../types/question';
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

const WorkbookCreate = () => {
  const userData = useUserData();

  const [isCreateModal, onCreateModalToggle] = useToggle(false);
  const [isSearchModal, onSearchModalToggle] = useToggle(false);

  const { text: title, onChange: handleTitleChange, reset: handleTitleReset } = useInput('');
  const { text: description, onChange: handleDescriptionChange, reset: handleDescriptionReset } = useInput('');
  const [isPublic, handlePublicChange] = useToggle(false);

  const [problemList, setProblemList] = useState<AddQuestion[]>([]);

  const createWorkbookMutation = useMutation(createWorkbook);

  const handleProblemAdd = (problem: AddQuestion) => {
    const listFilter = problemList.filter((currProblem) => problem === currProblem);

    if (listFilter.length === 0) {
      toast.success('문제를 추가하였습니다.');
      setProblemList((prev) => [...prev, problem]);
    } else {
      toast.error('이미 추가된 문제입니다.');
    }
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
    if (!title || title.trim() === '') {
      toast.error('문제집 제목을 입력해주세요.');
      return;
    }
    if (!description || description.trim() === '') {
      toast.error('문제집 설명을 입력해주세요.');
      return;
    }

    if (problemList.length === 0) {
      toast.error('문제에 문제를 추가해주세요.');
      return;
    }

    const questions = problemList.map(({ questionId }) => questionId);

    createWorkbookMutation.mutate(
      {
        title,
        description,
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
              value={title}
              onChange={handleTitleChange}
            />
          </InfoItem>
          <InfoItem>
            <SubTitle>문제집 설명</SubTitle>
            <InfoTextArea
              id="category"
              placeholder="문제집 설명을 입력하세요."
              value={description}
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

      {isCreateModal && (
        <Modal onToggle={onCreateModalToggle}>
          <CreateProblemModal handleProblemAdd={handleProblemAdd} />
        </Modal>
      )}

      {isSearchModal && (
        <Modal onToggle={onSearchModalToggle}>
          <SearchProblemModal handleProblemAdd={handleProblemAdd} />
        </Modal>
      )}
    </>
  );
};

export default WorkbookCreate;
