import { useState } from 'react';
import styled from 'styled-components';

const RenderStep = styled.div<{ isShow: boolean }>`
  display: ${(props) => (props.isShow ? `block` : `none`)};
`;

const useMultistepForm = (steps: JSX.Element[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((prev) => {
      if (prev >= steps.length - 1) return prev;
      return prev + 1;
    });
  };

  const back = () => {
    setCurrentStepIndex((prev) => {
      if (prev <= 0) return prev;
      return prev - 1;
    });
  };

  const goTo = (index: number) => {
    setCurrentStepIndex(index);
  };

  const renderStep = (
    <div>
      {steps.map((step, idx) => (
        <RenderStep key={step.key} isShow={currentStepIndex === idx}>
          {step}
        </RenderStep>
      ))}
    </div>
  );

  return {
    currentStepIndex,
    step: renderStep,
    isFirstStep: currentStepIndex !== 0,
    isLastStep: currentStepIndex !== steps.length - 1,
    goTo,
    next,
    back,
  };
};

export default useMultistepForm;
