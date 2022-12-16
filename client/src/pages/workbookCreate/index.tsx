import { useRef, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createWorkbook } from '../../api/workbook';
import MainTitle from '../../components/common/mainTitle/MainTitle';
import Toggle from '../../components/common/Toggle';
import Modal from '../../components/modal';
import CreateQuestionModal from '../../components/modal/createQuestion';
import SearchQuestionModal from '../../components/modal/searchQuestion';
import useToggle from '../../hooks/useToggle';
import useUserData from '../../hooks/useUserData';
import { SubTitle } from '../../styles/common';
import {
  QuestionItem,
  QuestionItemButton,
  QuestionItemHashTagItem,
  QuestionItemHashTagList,
  QuestionItemTitle,
  QuestionItemUnderLine,
  QuestionList,
} from '../../styles/questionList';
import { AddQuestion } from '../../types/question';
import { QUESTION_TYPE } from '../../utils/constants';
import {
  ListButton,
  ButtonList,
  Container,
  InfoContainer,
  InfoButton,
  InfoInput,
  InfoItem,
  InfoToggle,
  QuestionListContainer,
  InfoTextArea,
  QuestionBox,
  QuestionType,
} from './Style';

const WorkbookCreate = () => {
  useUserData();

  const [isCreateModal, onCreateModalToggle] = useToggle(false);
  const [isSearchModal, onSearchModalToggle] = useToggle(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  const [questionList, setQuestionList] = useState<AddQuestion[]>([]);

  const createWorkbookMutation = useMutation(createWorkbook);

  const handleQuestionAdd = (question: AddQuestion) => {
    const listFilter = questionList.filter((currQuestion) => question.questionId === currQuestion.questionId);

    if (listFilter.length === 0) {
      toast.success('문제를 추가하였습니다.');
      setQuestionList((prev) => [...prev, question]);
    } else {
      toast.error('이미 추가된 문제입니다.');
    }
  };

  const handleQuestionDelete = (index: number) => {
    const updateQuestionList = questionList.filter((_, idx) => idx !== index);
    setQuestionList(updateQuestionList);
  };

  const handleWorkbookCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;

    const title = target.titleValue as HTMLInputElement;
    const description = target.descriptionValue as HTMLInputElement;
    const toggle = target.toggleValue as HTMLInputElement;

    if (!title.value || title.value.trim() === '') {
      toast.error('문제집 제목을 입력해주세요.');
      return;
    }
    if (!description.value || description.value.trim() === '') {
      toast.error('문제집 설명을 입력해주세요.');
      return;
    }

    if (questionList.length === 0) {
      toast.error('문제에 문제를 추가해주세요.');
      return;
    }

    const questions = questionList.map(({ questionId }) => questionId);

    createWorkbookMutation.mutate(
      {
        title: title.value,
        description: description.value,
        questions,
        isPublic: toggle.checked,
      },
      {
        onSuccess: () => {
          target.reset();
          setQuestionList([]);
          toast.success('문제집을 추가하였습니다.');
        },
      },
    );
  };

  return (
    <>
      <MainTitle title="문제집 만들기" />
      <Container>
        <InfoContainer onSubmit={handleWorkbookCreate}>
          <InfoItem>
            <SubTitle>문제집 제목</SubTitle>
            <InfoInput type="text" id="titleValue" placeholder="문제집 제목을 입력하세요." ref={titleRef} />
          </InfoItem>
          <InfoItem>
            <SubTitle>문제집 설명</SubTitle>
            <InfoTextArea id="descriptionValue" placeholder="문제집 설명을 입력하세요." ref={descRef} />
          </InfoItem>
          <InfoItem>
            <SubTitle>공유</SubTitle>
            <InfoToggle>
              <Toggle />
            </InfoToggle>
          </InfoItem>

          <InfoButton type="submit">문제집 생성</InfoButton>
        </InfoContainer>

        <QuestionListContainer>
          <ButtonList>
            <ListButton onClick={onSearchModalToggle}>문제 검색</ListButton>
            <ListButton onClick={onCreateModalToggle}>문제 추가</ListButton>
          </ButtonList>

          <QuestionList>
            {questionList.map((questionItem, idx) => {
              const { questionId, question, hashtags } = questionItem;

              return (
                <QuestionItem key={questionId}>
                  <QuestionBox>
                    <QuestionItemTitle>{question}</QuestionItemTitle>
                  </QuestionBox>
                  <QuestionItemUnderLine>
                    <QuestionItemHashTagList>
                      {hashtags.map((hashtag) => (
                        <QuestionItemHashTagItem key={hashtag}>{hashtag}</QuestionItemHashTagItem>
                      ))}
                    </QuestionItemHashTagList>
                    <QuestionItemButton onClick={() => handleQuestionDelete(idx)}>제거</QuestionItemButton>
                  </QuestionItemUnderLine>
                </QuestionItem>
              );
            })}
          </QuestionList>
        </QuestionListContainer>
      </Container>

      {isCreateModal && (
        <Modal onToggle={onCreateModalToggle}>
          <CreateQuestionModal handleQuestionAdd={handleQuestionAdd} />
        </Modal>
      )}

      {isSearchModal && (
        <Modal onToggle={onSearchModalToggle}>
          <SearchQuestionModal handleQuestionAdd={handleQuestionAdd} />
        </Modal>
      )}
    </>
  );
};

export default WorkbookCreate;
