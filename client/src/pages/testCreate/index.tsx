import { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTest } from '../../api/test';
import MainTitle from '../../components/common/mainTitle/MainTitle';
import Modal from '../../components/modal';
import SearchWorkbookModal from '../../components/modal/searchWorkbook';
import useArrayText from '../../hooks/useArrayText';
import useToggle from '../../hooks/useToggle';
import useUserData from '../../hooks/useUserData';
import { Button, SubTitle } from '../../styles/common';
import { Workbook } from '../../types/workbook';
import {
  Container,
  CreateButton,
  InfoBox,
  InfoContainer,
  InfoInput,
  InfoInputBox,
  InfoText,
  InfoTimeInput,
  Total,
  WorkbookBox,
  WorkbookContainer,
  WorkbookDeleteButton,
  WorkbookDesc,
  WorkbookHeader,
  WorkbookInfo,
  WorkbookInput,
  WorkbookItem,
  WorkbookList,
  WorkbookTitle,
} from './Style';

const TestCreate = () => {
  useUserData();
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const minuteRef = useRef<HTMLInputElement>(null);
  const secondRef = useRef<HTMLInputElement>(null);
  const [isAddModal, onAddModalToggle] = useToggle(false);
  const [workbookList, setWorkbookList] = useState<Workbook[]>([]);

  const {
    state: questionList,
    values: questionValues,
    add: handleQuestionListAdd,
    erase: handleQuestionListDelete,
    change: handleQuestionListUpdate,
  } = useArrayText();

  const createTestMutation = useMutation(createTest);

  const handleWorkbookAdd = (workbook: Workbook) => {
    const listFilter = workbookList.filter((currWorkbook) => workbook === currWorkbook);

    if (listFilter.length === 0) {
      toast.success('문제집을 추가하였습니다.');
      setWorkbookList((prev) => [...prev, workbook]);
      handleQuestionListAdd();
    } else {
      toast.error('이미 추가된 문제집입니다.');
    }
  };

  const handleQuestionLengthUpdate = (index: number, data: string, maxLength: number) => {
    const numberData = Number(data);
    const deleteKey = questionList[index][0];
    let updateData = data;

    if (numberData > maxLength) {
      updateData = maxLength.toString();
    }

    handleQuestionListUpdate(deleteKey, updateData);
  };

  const handleQuestionDelete = (index: number) => {
    const updateWorkbookList = workbookList.filter((data, idx) => idx !== index);
    const deleteKey = questionList[index][0];

    setWorkbookList(updateWorkbookList);
    handleQuestionListDelete(deleteKey);
  };

  const getTotalQuestionList = () => {
    return questionValues.reduce((prev, curr) => prev + Number(curr), 0);
  };

  const handleTestCreate = () => {
    const workbooks = workbookList.map(({ workbookId }, idx) => ({
      workbookId,
      count: Number(questionValues[idx]),
    }));
    let title = '';
    let minutes = 0;
    let seconds = 0;

    if (titleRef.current) {
      title = titleRef.current.value;
    }
    if (minuteRef.current) {
      minutes = Number(minuteRef.current.value);
    }
    if (secondRef.current) {
      seconds = Number(secondRef.current.value);
    }

    if (!title || title.trim() === '') {
      toast.error('시험명을 입력해주세요.');
      return;
    }

    if (minutes + seconds <= 0) {
      toast.error('시험 시간이 0초 입니다.');
      return;
    }

    if (getTotalQuestionList() === 0) {
      toast.error('문제를 추가해주세요.');
      return;
    }

    createTestMutation.mutate(
      {
        title,
        minutes,
        seconds,
        workbooks,
      },
      {
        onSuccess: () => {
          toast.success('시험을 만들었습니다.');
          navigate('/home');
        },
      },
    );
  };

  const total = getTotalQuestionList();

  return (
    <>
      <MainTitle title="시험 만들기" />
      <Container>
        <InfoContainer>
          <InfoBox>
            <SubTitle>시험명</SubTitle>
            <InfoInput type="text" ref={titleRef} placeholder="시험명을 입력해주세요." />
          </InfoBox>
          <InfoBox>
            <SubTitle>시험 시간</SubTitle>
            <InfoInputBox>
              <InfoTimeInput
                type="number"
                ref={minuteRef}
                defaultValue={0}
                placeholder="시험 시간(분)을 입력해주세요"
              />
              <InfoText>분</InfoText>
              <InfoTimeInput
                type="number"
                ref={secondRef}
                defaultValue={0}
                placeholder="시험 시간(초)을 입력해주세요"
              />
              <InfoText>초</InfoText>
            </InfoInputBox>
          </InfoBox>
        </InfoContainer>

        <WorkbookContainer>
          <WorkbookBox>
            <SubTitle>문제집 추가</SubTitle>
            <Button onClick={onAddModalToggle}>추가</Button>
          </WorkbookBox>

          <WorkbookList>
            <WorkbookHeader>
              <div>문제집 정보</div>
              <div>문제수</div>
            </WorkbookHeader>
            {workbookList.map((workbook, idx) => {
              const { workbookId, title, description, questions } = workbook;
              return (
                <WorkbookItem key={workbookId}>
                  <WorkbookInfo>
                    <WorkbookBox>
                      <WorkbookTitle>{title}</WorkbookTitle>
                      <WorkbookDeleteButton onClick={() => handleQuestionDelete(idx)}>제거</WorkbookDeleteButton>
                    </WorkbookBox>
                    <WorkbookDesc>{description}</WorkbookDesc>
                  </WorkbookInfo>

                  <WorkbookInput
                    type="number"
                    value={questionValues[idx]}
                    onChange={(e) => handleQuestionLengthUpdate(idx, e.target.value, questions.length)}
                  />
                </WorkbookItem>
              );
            })}
          </WorkbookList>

          <Total>총 문제수 : {total}</Total>
        </WorkbookContainer>

        <CreateButton onClick={handleTestCreate}>시험 생성</CreateButton>
      </Container>

      {isAddModal && (
        <Modal onToggle={onAddModalToggle}>
          <SearchWorkbookModal handleWorkbookAdd={handleWorkbookAdd} />
        </Modal>
      )}
    </>
  );
};

export default TestCreate;
