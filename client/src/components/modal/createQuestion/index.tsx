import { useState } from 'react';
import { useMutation } from 'react-query';
import { BsCircleFill } from '@react-icons/all-files/bs/BsCircleFill';
import { toast } from 'react-toastify';
import { createQuestion } from '../../../api/question';
import { ButtonList, StepContainer, ModalButton, StepBar, Container, StepBarItem, StepBarButton } from './Style';
import { AddQuestion } from '../../../types/question';
import useMultistepForm from '../../../hooks/useMultistepForm';
import QuestionInfoForm from './forms/QuestionInfoForm';
import QuestionAnswerForm from './forms/QuestionAnswerForm';
import QuestionEtcForm from './forms/QuestionEtcForm';
import { QUESTION_TYPE } from '../../../utils/constants';

interface Props {
  handleQuestionAdd: (question: AddQuestion) => void;
}

interface FormData {
  question: string;
  image: File | null;
  questionType: string;
  hashTagList: string[];
  optionList: string[];
  answer: string;
  commentary: string;
  difficultValue: number;
}

const INITIAL_DATA = {
  question: '',
  image: null,
  questionType: QUESTION_TYPE.subjective,
  hashTagList: [] as string[],
  optionList: [] as string[],
  answer: '',
  commentary: '',
  difficultValue: 0,
};

const CreateQuestionModal = ({ handleQuestionAdd }: Props) => {
  const [formData, setFormData] = useState<FormData>(INITIAL_DATA);

  const updateFields = (fields: Partial<FormData>) => {
    setFormData((prev) => {
      return { ...prev, ...fields };
    });
  };

  const { step, currentStepIndex, isFirstStep, isLastStep, goTo, next, back } = useMultistepForm([
    <QuestionInfoForm key="firstStep" {...formData} updateFields={updateFields} />,
    <QuestionAnswerForm key="secondStep" {...formData} updateFields={updateFields} />,
    <QuestionEtcForm key="thirdStep" {...formData} updateFields={updateFields} />,
  ]);

  const createQuestionMutation = useMutation(createQuestion);

  const handleModalReset = () => {
    goTo(0);
    setFormData(INITIAL_DATA);
  };

  const handleQuestionCreate = () => {
    const { question, image, questionType, hashTagList, optionList, answer, commentary, difficultValue } = formData;
    const isSubjective = questionType === QUESTION_TYPE.subjective;
    const checkOptionLength = new Set(optionList).size;

    if (!question || question.trim() === '') {
      goTo(0);
      toast.error('?????? ????????? ??????????????????.');
      return;
    }

    if (!isSubjective && optionList.length < 5) {
      goTo(1);
      toast.error('????????? ????????? ?????? 5?????? ??????????????? ?????????.');
      return;
    }

    if (checkOptionLength !== optionList.length) {
      goTo(1);
      toast.error('????????? ????????? ????????? ?????? ????????????.');
      return;
    }

    if (!answer || answer.trim() === '') {
      goTo(1);
      toast.error(`????????? ????????? ${isSubjective ? `??????` : `??????`} ????????????.`);
      return;
    }

    if (!commentary || commentary.trim() === '') {
      goTo(2);
      toast.error('?????? ????????? ??????????????????.');
      return;
    }

    const bodyData = new FormData();

    if (image) bodyData.append('images', image);

    bodyData.append('question', question);
    bodyData.append('questionType', questionType);
    bodyData.append('answer', answer);
    bodyData.append('commentary', commentary);
    bodyData.append('difficulty', difficultValue.toString());
    bodyData.append('hashtags', JSON.stringify(hashTagList));
    bodyData.append('options', JSON.stringify(optionList));

    createQuestionMutation.mutate(bodyData, {
      onSuccess: (rowData) => {
        handleQuestionAdd(rowData.data);
        handleModalReset();
      },
    });
  };

  return (
    <Container>
      <StepBar>
        <StepBarItem isActive={currentStepIndex >= 0}>
          <StepBarButton onClick={() => goTo(0)}>1</StepBarButton>
        </StepBarItem>
        <StepBarItem isActive={currentStepIndex >= 1}>
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <StepBarButton onClick={() => goTo(1)}>2</StepBarButton>
        </StepBarItem>
        <StepBarItem isActive={currentStepIndex >= 2}>
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <BsCircleFill size={10} />
          <StepBarButton onClick={() => goTo(2)}>3</StepBarButton>
        </StepBarItem>
      </StepBar>
      <StepContainer>
        {step}
        <ButtonList>
          <ModalButton
            type="button"
            isDisplay={isFirstStep}
            isActive={false}
            //
            onClick={back}
          >
            ??????
          </ModalButton>
          <ModalButton
            type="button"
            isDisplay
            isActive={false}
            //
            onClick={isLastStep ? next : handleQuestionCreate}
          >
            {isLastStep ? `??????` : `??????`}
          </ModalButton>
        </ButtonList>
      </StepContainer>
    </Container>
  );
};

export default CreateQuestionModal;
