import { useState } from 'react';
import { AiOutlineCheckSquare } from 'react-icons/ai';
import { BiCircle, BiImageAdd } from 'react-icons/bi';
import { FaCircle } from 'react-icons/fa';
import { useMutation } from 'react-query';
import createQuestion from '../../../api/question';
import useToggle from '../../../hooks/useToggle';
import { colors } from '../../../styles/theme';
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
} from './Style';

const STEP = ['QUESTIONS', ['MULTIPLE', 'ESSAY'], 'COMMENTARY'];

const CreateProblemModal = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [questionType, onChange] = useToggle(false);

  const questionCreate = useMutation(createQuestion);

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
            <CreateModalLabel htmlFor="question">
              문제 지문
              <textarea id="question" rows={5} placeholder="지문을 입력하세요." />
            </CreateModalLabel>
            <CreateModalLabel htmlFor="file">
              문제 이미지
              <input type="file" hidden id="file" />
              <CreateModalImageBox>
                <BiImageAdd size={50} />
              </CreateModalImageBox>
            </CreateModalLabel>
            <CreateModalTitleBox>
              <span>문제 유형</span>
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
                <span>보기 등록</span>
                <span>정답</span>
              </CreateModalTitleBox>
              <CreateModalContentBox>
                <CreateModalQuestionBox>
                  <input />

                  <button type="button">
                    <AiOutlineCheckSquare size={40} />
                  </button>
                </CreateModalQuestionBox>
                <CreateModalQuestionBox>
                  <input />

                  <button type="button">
                    <AiOutlineCheckSquare size={40} />
                  </button>
                </CreateModalQuestionBox>
                <CreateModalQuestionBox>
                  <input />

                  <button type="button">
                    <AiOutlineCheckSquare size={40} />
                  </button>
                </CreateModalQuestionBox>
                <CreateModalAddButton>추가</CreateModalAddButton>
              </CreateModalContentBox>
            </CreateModalStep>
          ) : (
            <CreateModalStep>
              <CreateModalLabel htmlFor="commentary">
                모범 답안 작성
                <textarea id="commentary" rows={18} />
              </CreateModalLabel>
            </CreateModalStep>
          ))}
        {currentStep === 3 && (
          <CreateModalStep>
            <CreateModalLabel htmlFor="commentary">
              해설 작성
              <textarea id="commentary" rows={15} />
            </CreateModalLabel>

            <CreateModalTitleBox>
              <span>문제 난이도</span>
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
