import { useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';
import { BsCheckLg } from 'react-icons/bs';
import useArrayText from '../../../../hooks/useArrayText';
import { SubTitle, TextArea } from '../../../../styles/common';
import { QUESTION_TYPE } from '../../../../utils/constants';
import {
  AddButton,
  ContentBox,
  DeleteButton,
  QuestionBox,
  QuestionButton,
  QuestionInput,
  Step,
  TitleBox,
} from '../Style';

interface AnswerData {
  questionType: string;
  optionList: string[];
  answer: string;
}

type Props = AnswerData & {
  updateFields: (fields: Partial<AnswerData>) => void;
};

const QuestionAnswerForm = ({ questionType, optionList, answer, updateFields }: Props) => {
  const {
    state: optionState,
    values: optionValues,
    change: handleOptionChange,
    add: handleOptionAdd,
    erase: handleOptionDelete,
    reset: handleOptionListReset,
  } = useArrayText();
  const [answerIdx, setAnswerIdx] = useState<number>(-1);

  const handleAnswerSelect = (idx: number) => {
    setAnswerIdx(optionState[idx][0]);
    updateFields({
      answer: optionValues[idx],
    });
  };

  useEffect(() => {
    if (optionList.length === 0) {
      handleOptionListReset();
    }
  }, [optionList]);

  useEffect(() => {
    if (optionList.length !== optionValues.length)
      updateFields({
        optionList: optionValues,
      });
  }, [optionValues]);

  return questionType === QUESTION_TYPE.subjective ? (
    <Step>
      <SubTitle>모범 답안 작성</SubTitle>
      <TextArea id="answer" rows={18} value={answer} onChange={(e) => updateFields({ answer: e.target.value })} />
    </Step>
  ) : (
    <Step>
      <TitleBox>
        <SubTitle>보기 등록</SubTitle>
        <SubTitle>정답</SubTitle>
      </TitleBox>
      <ContentBox>
        {optionState.map(([key, data], idx) => (
          <QuestionBox key={key}>
            <QuestionInput value={data} onChange={({ target }) => handleOptionChange(key, target.value)} />

            <QuestionButton type="button" isActive={answerIdx === key} onClick={() => handleAnswerSelect(idx)}>
              <BsCheckLg size={20} />
            </QuestionButton>

            <DeleteButton onClick={() => handleOptionDelete(key)}>
              <BiX />
            </DeleteButton>
          </QuestionBox>
        ))}

        {optionState.length <= 5 && <AddButton onClick={() => handleOptionAdd()}>추가</AddButton>}
      </ContentBox>
    </Step>
  );
};

export default QuestionAnswerForm;
