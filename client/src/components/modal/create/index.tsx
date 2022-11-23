import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { BiCircle, BiImageAdd } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import { MdArrowDropDown } from 'react-icons/md';
import useToggle from '../../../hooks/useToggle';
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
} from './Style';
import DropDown from '../../common/dropdown/Dropdown';

const STEP = ['QUESTIONS', ['MULTIPLE', 'ESSAY'], 'COMMENTARY'];

const CreateProblemModal = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [questionType, onChange] = useToggle(false);

  const handleNextStep = () => {
    if (currentStep < STEP.length) setCurrentStep((prev) => prev + 1);
  };

  const handleBeforeStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return (
    <Container>
      <StepBar>
        <StepBarItem isActive={currentStep >= 1}>
          <FaCircle onClick={() => setCurrentStep(1)} />
        </StepBarItem>
        <StepBarItem isActive={currentStep >= 2}>
          <BiCircle size={10} />
          <BiCircle size={10} />
          <BiCircle size={10} />
          <FaCircle onClick={() => setCurrentStep(2)} />
        </StepBarItem>
        <StepBarItem isActive={currentStep >= 3}>
          <BiCircle size={10} />
          <BiCircle size={10} />
          <BiCircle size={10} />
          <FaCircle onClick={() => setCurrentStep(3)} />
        </StepBarItem>
      </StepBar>
      <StepContainer>
        {currentStep === 1 && (
          <Step>
            <SubTitle>문제 지문</SubTitle>
            <TextArea id="question" rows={5} placeholder="지문을 입력하세요." />

            <SubTitle>문제 이미지</SubTitle>
            <Label htmlFor="file">
              <Input type="file" hidden id="file" />
              <ImageBox>
                <BiImageAdd size={50} />
              </ImageBox>
            </Label>
            <TitleBox>
              <SubTitle>문제 유형</SubTitle>
            </TitleBox>

            <ContentBox>
              <ModalButton type="button" isDisplay isActive={!questionType} onClick={onChange}>
                주관식
              </ModalButton>
              <ModalButton type="button" isDisplay isActive={questionType} onClick={onChange}>
                객관식
              </ModalButton>
            </ContentBox>
          </Step>
        )}
        {currentStep === 2 &&
          (questionType ? (
            <Step>
              <TitleBox>
                <SubTitle>보기 등록</SubTitle>
                <SubTitle>정답</SubTitle>
              </TitleBox>
              <ContentBox>
                <QuestionBox>
                  <QuestionInput />

                  <QuestionButton type="button">
                    <BsCheckLg size={20} />
                  </QuestionButton>
                </QuestionBox>
                <QuestionBox>
                  <QuestionInput />

                  <QuestionButton type="button">
                    <BsCheckLg size={20} />
                  </QuestionButton>
                </QuestionBox>
                <QuestionBox>
                  <QuestionInput />

                  <QuestionButton type="button">
                    <BsCheckLg size={20} />
                  </QuestionButton>
                </QuestionBox>
                <AddButton>추가</AddButton>
              </ContentBox>
            </Step>
          ) : (
            <Step>
              <SubTitle>모범 답안 작성</SubTitle>
              <TextArea id="commentary" rows={18} />
            </Step>
          ))}
        {currentStep === 3 && (
          <Step>
            <SubTitle>해설 작성</SubTitle>
            <TextArea id="commentary" rows={15} />

            <TitleBox>
              <SubTitle>문제 난이도</SubTitle>
            </TitleBox>

            <DropDownContainer>
              <DropDown
                title={
                  <DropDownSelector>
                    <DropDownTitle>123</DropDownTitle>
                    <DropDownIcon>
                      <MdArrowDropDown size={30} />
                    </DropDownIcon>
                  </DropDownSelector>
                }
                values={['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F']}
                direction="right"
              />
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
              onClick={handleNextStep}
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
