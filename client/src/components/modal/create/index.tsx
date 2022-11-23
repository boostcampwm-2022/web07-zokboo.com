import { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { BiCircle, BiImageAdd } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import useToggle from '../../../hooks/useToggle';
import { Input, SubTitle, TextArea } from '../../../styles/common';
import {
  CreateModalButtonList,
  CreateModalStepContainer,
  CreateModalContentBox,
  CreateModalLabel,
  CreateModalStep,
  CreateModalTitleBox,
  CreateModalButton,
  CreateModalImageBox,
  CreateModalAddButton,
  CreateModalQuestionBox,
  CreateModalStepBar,
  CreateModalContainer,
  CreateModalStepBarItem,
  CreateModalQuestionButton,
  CreateModalQuestionInput,
} from './Style';

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
    <CreateModalContainer>
      <CreateModalStepBar>
        <CreateModalStepBarItem isActive={currentStep >= 1}>
          <FaCircle onClick={() => setCurrentStep(1)} />
        </CreateModalStepBarItem>
        <CreateModalStepBarItem isActive={currentStep >= 2}>
          <BiCircle size={10} />
          <BiCircle size={10} />
          <BiCircle size={10} />
          <FaCircle onClick={() => setCurrentStep(2)} />
        </CreateModalStepBarItem>
        <CreateModalStepBarItem isActive={currentStep >= 3}>
          <BiCircle size={10} />
          <BiCircle size={10} />
          <BiCircle size={10} />
          <FaCircle onClick={() => setCurrentStep(3)} />
        </CreateModalStepBarItem>
      </CreateModalStepBar>
      <CreateModalStepContainer>
        {currentStep === 1 && (
          <CreateModalStep>
            <SubTitle>문제 지문</SubTitle>
            <TextArea id="question" rows={5} placeholder="지문을 입력하세요." />

            <SubTitle>문제 이미지</SubTitle>
            <CreateModalLabel htmlFor="file">
              <Input type="file" hidden id="file" />
              <CreateModalImageBox>
                <BiImageAdd size={50} />
              </CreateModalImageBox>
            </CreateModalLabel>
            <CreateModalTitleBox>
              <SubTitle>문제 유형</SubTitle>
            </CreateModalTitleBox>

            <CreateModalContentBox>
              <CreateModalButton type="button" isDisplay isActive={!questionType} onClick={onChange}>
                주관식
              </CreateModalButton>
              <CreateModalButton type="button" isDisplay isActive={questionType} onClick={onChange}>
                객관식
              </CreateModalButton>
            </CreateModalContentBox>
          </CreateModalStep>
        )}
        {currentStep === 2 &&
          (questionType ? (
            <CreateModalStep>
              <CreateModalTitleBox>
                <SubTitle>보기 등록</SubTitle>
                <SubTitle>정답</SubTitle>
              </CreateModalTitleBox>
              <CreateModalContentBox>
                <CreateModalQuestionBox>
                  <CreateModalQuestionInput />

                  <CreateModalQuestionButton type="button">
                    <BsCheckLg size={20} />
                  </CreateModalQuestionButton>
                </CreateModalQuestionBox>
                <CreateModalQuestionBox>
                  <CreateModalQuestionInput />

                  <CreateModalQuestionButton type="button">
                    <BsCheckLg size={20} />
                  </CreateModalQuestionButton>
                </CreateModalQuestionBox>
                <CreateModalQuestionBox>
                  <CreateModalQuestionInput />

                  <CreateModalQuestionButton type="button">
                    <BsCheckLg size={20} />
                  </CreateModalQuestionButton>
                </CreateModalQuestionBox>
                <CreateModalAddButton>추가</CreateModalAddButton>
              </CreateModalContentBox>
            </CreateModalStep>
          ) : (
            <CreateModalStep>
              <SubTitle>모범 답안 작성</SubTitle>
              <TextArea id="commentary" rows={18} />
            </CreateModalStep>
          ))}
        {currentStep === 3 && (
          <CreateModalStep>
            <SubTitle>해설 작성</SubTitle>
            <TextArea id="commentary" rows={15} />

            <CreateModalTitleBox>
              <SubTitle>문제 난이도</SubTitle>
            </CreateModalTitleBox>

            {/* 
          <DropdownContainer>
            <Dropdown>1</Dropdown>
            <Dropdown>1</Dropdown>
          </DropdownContainer> 
          */}
          </CreateModalStep>
        )}

        <CreateModalButtonList>
          <CreateModalButton
            type="button"
            isDisplay={currentStep !== 1}
            isActive={false}
            //
            onClick={handleBeforeStep}
          >
            이전
          </CreateModalButton>
          <CreateModalButton
            type="button"
            isDisplay={currentStep !== 3}
            isActive={false}
            //
            onClick={handleNextStep}
          >
            다음
          </CreateModalButton>
          {currentStep === 3 && (
            <CreateModalButton
              type="button"
              isDisplay
              isActive={false}
              //
              onClick={handleNextStep}
            >
              추가
            </CreateModalButton>
          )}
        </CreateModalButtonList>
      </CreateModalStepContainer>
    </CreateModalContainer>
  );
};

export default CreateProblemModal;
