import { useState } from 'react';
import { BiImageAdd, BiX } from 'react-icons/bi';
import { useMutation } from 'react-query';
import { BsCheckLg, BsCircleFill } from 'react-icons/bs';
import { MdArrowDropDown } from 'react-icons/md';
import createQuestion from '../../../api/question';
import { Input, SubTitle, TextArea } from '../../../styles/common';
import {
  ButtonList,
  StepContainer,
  ContentBox,
  Label,
  Step,
  TitleBox,
  ModalButton,
  ImageBox,
  AddButton,
  QuestionBox,
  StepBar,
  Container,
  StepBarItem,
  QuestionButton,
  QuestionInput,
  DropDownTitle,
  DropDownContainer,
  DropDownSelector,
  DropDownIcon,
  StepBarButton,
  DeleteButton,
  HashTagBox,
  HashTagButton,
  HashTagItemBox,
  HashTagItem,
} from './Style';
import DropDown from '../../common/dropdown/Dropdown';
import QUESTION_TYPE from './constants';
import { Problem } from '../../../types/workbook';
import useInput from '../../../hooks/useInput';
import useArrayText from '../../../hooks/useArrayText';
import { DropdownItem } from '../../common/dropdown/Style';

const STEP = ['QUESTIONS', ['SUBJECTIVE', 'MULTIPLE'], 'COMMENTARY'];

interface Props {
  handleProblemAdd: (problem: Problem) => void;
}

const DIFFICULTY = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'];
const VERIFICATION = {
  blank: /^\s+$/,
};

const CreateProblemModal = ({ handleProblemAdd }: Props) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const [question, handleQuestionChange, q_, handleQuestionReset] = useInput('', VERIFICATION.blank);
  const [file, handleFileChange, f_, handleFileReset] = useInput('');
  const [questionType, setQuestionType] = useState(QUESTION_TYPE.SUBJECTIVE);
  const {
    state: hashTagList,
    values: hashTagValues,
    add: handleHashTagAdd,
    erase: handleHashTagDelete,
    reset: handleHashTagListReset,
  } = useArrayText();
  const [hashTag, handleHashTagChange, __, handleHashTagReset] = useInput('');

  const {
    state: optionList,
    values: optionValues,
    change: handleOptionChange,
    add: handleOptionAdd,
    erase: handleOptionDelete,
    reset: handleOptionListReset,
  } = useArrayText();
  const [subject, handleSubjectChange, _s, handleSubjectReset] = useInput('');

  const [commentary, onCommentaryChange, _c, handleCommentaryReset] = useInput('');
  const [difficultValue, setDifficultValue] = useState(0);
  const [answerIdx, setAnswerIdx] = useState<number>(0);

  const handleUpdateType = ({ target }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const isElement = target instanceof HTMLButtonElement;

    if (isElement && questionType !== target.value) {
      setQuestionType(target.value);
      setAnswerIdx(0);
    }
  };

  const questionCreate = useMutation(createQuestion);

  const handleNextStep = () => {
    if (currentStep < STEP.length) setCurrentStep((prev) => prev + 1);
  };
  const handleBeforeStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleHashTagAddCheck = () => {
    if (hashTag) {
      handleHashTagAdd(hashTag);
      handleHashTagReset();
    }
  };

  const handleModalReset = () => {
    setCurrentStep(1);
    handleQuestionReset();
    handleFileReset();
    handleHashTagListReset();
    handleHashTagReset();
    handleOptionListReset();
    handleSubjectReset();
    handleCommentaryReset();
    setDifficultValue(0);
    setAnswerIdx(0);
  };

  const handleQuestionCreate = () => {
    const answer = questionType === QUESTION_TYPE.SUBJECTIVE ? subject : optionValues[answerIdx];

    if (!question || question.trim() === '') {
      setCurrentStep(1);
      console.log('문제 지문이; 없습니다');
      return;
    }
    if (!commentary || commentary.trim() === '') {
      console.log('해설이없습니다~~');
      return;
    }
    if (!answer || answer.trim() === '') {
      console.log('오류 체크');
      return;
    }
    if (hashTagValues.length === 0) {
      console.log('오류 체크');
      return;
    }

    questionCreate.mutate(
      {
        question,
        questionType,
        answer,
        commentary,
        difficulty: difficultValue,
        hashtags: hashTagValues,
        options: optionValues,
      },
      {
        onSuccess: (data: Problem) => {
          console.log('성공', data);
          handleProblemAdd(data);
          handleModalReset();
        },
        onError: () => {
          console.log('실패');
        },
      },
    );
  };

  return (
    <Container>
      <StepBar>
        <StepBarItem isActive={currentStep >= 1}>
          <StepBarButton onClick={() => setCurrentStep(1)}>1</StepBarButton>
        </StepBarItem>
        <StepBarItem isActive={currentStep >= 2}>
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <StepBarButton onClick={() => setCurrentStep(2)}>2</StepBarButton>
        </StepBarItem>
        <StepBarItem isActive={currentStep >= 3}>
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <StepBarButton onClick={() => setCurrentStep(3)}>3</StepBarButton>
        </StepBarItem>
      </StepBar>
      <StepContainer>
        {currentStep === 1 && (
          <Step>
            <SubTitle>문제 지문</SubTitle>
            <TextArea id="question" rows={4} placeholder="지문을 입력하세요." onChange={handleQuestionChange} />

            <SubTitle>문제 이미지</SubTitle>
            <Label htmlFor="file">
              <Input type="file" hidden id="file" onChange={handleFileChange} />
              <ImageBox>
                <BiImageAdd size={50} />
              </ImageBox>
            </Label>
            <TitleBox>
              <SubTitle>문제 유형</SubTitle>
            </TitleBox>

            <ContentBox>
              <ModalButton
                type="button"
                isDisplay
                isActive={questionType === QUESTION_TYPE.SUBJECTIVE}
                value={QUESTION_TYPE.SUBJECTIVE}
                onClick={handleUpdateType}
              >
                주관식
              </ModalButton>
              <ModalButton
                type="button"
                isDisplay
                isActive={questionType === QUESTION_TYPE.MULTIPLE}
                value={QUESTION_TYPE.MULTIPLE}
                onClick={handleUpdateType}
              >
                객관식
              </ModalButton>
            </ContentBox>

            <TitleBox>
              <SubTitle>해쉬태그 등록</SubTitle>
              {hashTagList.length < 5 && (
                <HashTagBox>
                  <QuestionInput value={hashTag} onChange={handleHashTagChange} />
                  <HashTagButton onClick={handleHashTagAddCheck}>추가</HashTagButton>
                </HashTagBox>
              )}
            </TitleBox>
            <ContentBox>
              {hashTagList.map(([key, data]) => (
                <HashTagItemBox key={key}>
                  <HashTagItem>{data}</HashTagItem>

                  <DeleteButton onClick={() => handleHashTagDelete(key)}>
                    <BiX />
                  </DeleteButton>
                </HashTagItemBox>
              ))}
            </ContentBox>
          </Step>
        )}
        {currentStep === 2 &&
          (questionType === QUESTION_TYPE.SUBJECTIVE ? (
            <Step>
              <SubTitle>모범 답안 작성</SubTitle>
              <TextArea id="answer" rows={18} onChange={handleSubjectChange} />
            </Step>
          ) : (
            <Step>
              <TitleBox>
                <SubTitle>보기 등록</SubTitle>
                <SubTitle>정답</SubTitle>
              </TitleBox>
              <ContentBox>
                {optionList.map(([key, data], idx) => (
                  <QuestionBox key={key}>
                    <QuestionInput value={data} onChange={({ target }) => handleOptionChange(key, target.value)} />

                    <QuestionButton type="button" isActive={answerIdx === idx} onClick={() => setAnswerIdx(idx)}>
                      <BsCheckLg size={20} />
                    </QuestionButton>

                    <DeleteButton onClick={() => handleOptionDelete(key)}>
                      <BiX />
                    </DeleteButton>
                  </QuestionBox>
                ))}

                {optionList.length <= 5 && <AddButton onClick={() => handleOptionAdd()}>추가</AddButton>}
              </ContentBox>
            </Step>
          ))}
        {currentStep === 3 && (
          <Step>
            <SubTitle>해설 작성</SubTitle>
            <TextArea id="commentary" rows={15} onChange={onCommentaryChange} />

            <TitleBox>
              <SubTitle>문제 난이도</SubTitle>
            </TitleBox>

            <DropDownContainer>
              <DropDown
                title={
                  <DropDownSelector>
                    <DropDownTitle>{DIFFICULTY[difficultValue]}</DropDownTitle>
                    <DropDownIcon>
                      <MdArrowDropDown size={30} />
                    </DropDownIcon>
                  </DropDownSelector>
                }
                direction="right"
              >
                {DIFFICULTY.map((data, idx) => (
                  <DropdownItem key={data} onClick={() => setDifficultValue(idx)}>
                    {data}
                  </DropdownItem>
                ))}
              </DropDown>
            </DropDownContainer>
          </Step>
        )}

        <ButtonList>
          <ModalButton
            type="button"
            isDisplay={currentStep !== 1}
            isActive={false}
            //
            onClick={handleBeforeStep}
          >
            이전
          </ModalButton>
          <ModalButton
            type="button"
            isDisplay={currentStep !== 3}
            isActive={false}
            //
            onClick={handleNextStep}
          >
            다음
          </ModalButton>
          {currentStep === 3 && (
            <ModalButton
              type="button"
              isDisplay
              isActive={false}
              //
              onClick={handleQuestionCreate}
            >
              추가
            </ModalButton>
          )}
        </ButtonList>
      </StepContainer>
    </Container>
  );
};

export default CreateProblemModal;
