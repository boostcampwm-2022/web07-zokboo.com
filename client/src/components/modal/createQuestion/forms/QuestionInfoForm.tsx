import { useEffect } from 'react';
import { BiImageAdd } from '@react-icons/all-files/bi/BiImageAdd';
import { BiX } from '@react-icons/all-files/bi/BiX';
import useArrayText from '../../../../hooks/useArrayText';
import { Input, SubTitle, TextArea } from '../../../../styles/common';
import { QUESTION_TYPE } from '../../../../utils/constants';
import {
  ContentBox,
  DeleteButton,
  HashTagForm,
  HashTagButton,
  HashTagItem,
  HashTagItemBox,
  ImageBox,
  Label,
  ModalButton,
  QuestionInput,
  Step,
  TitleBox,
} from '../Style';

interface InfoData {
  question: string;
  file: string;
  questionType: string;
  hashTagList: string[];
}

type Props = InfoData & {
  updateFields: (fields: Partial<InfoData>) => void;
};

const QuestionInfoForm = ({ question, file, questionType, hashTagList, updateFields }: Props) => {
  const {
    state: hashTagState,
    values: hashTagValues,
    add: handleHashTagAdd,
    erase: handleHashTagDelete,
    reset: handleHashTagListReset,
  } = useArrayText();

  const handleHashTagAddCheck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const hashTag = target.hashtag as HTMLInputElement;

    handleHashTagAdd(hashTag.value);
    target.reset();
  };

  useEffect(() => {
    if (hashTagList.length === 0) {
      handleHashTagListReset();
    }
  }, [hashTagList]);

  useEffect(() => {
    if (hashTagList.length !== hashTagValues.length)
      updateFields({
        hashTagList: hashTagValues,
      });
  }, [hashTagValues]);

  return (
    <Step>
      <SubTitle>문제 지문</SubTitle>
      <TextArea
        id="question"
        rows={4}
        placeholder="지문을 입력하세요."
        value={question}
        onChange={(e) => updateFields({ question: e.target.value })}
      />

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
        <ModalButton
          type="button"
          isDisplay
          isActive={questionType === QUESTION_TYPE.subjective}
          value={QUESTION_TYPE.subjective}
          onClick={() => updateFields({ questionType: QUESTION_TYPE.subjective })}
        >
          주관식
        </ModalButton>
        <ModalButton
          type="button"
          isDisplay
          isActive={questionType === QUESTION_TYPE.multiple}
          value={QUESTION_TYPE.multiple}
          onClick={() => updateFields({ questionType: QUESTION_TYPE.multiple })}
        >
          객관식
        </ModalButton>
      </ContentBox>

      <TitleBox>
        <SubTitle>해쉬태그 등록</SubTitle>
        {hashTagState.length < 5 && (
          <HashTagForm onSubmit={handleHashTagAddCheck}>
            <QuestionInput id="hashtag" />
            <HashTagButton type="submit">추가</HashTagButton>
          </HashTagForm>
        )}
      </TitleBox>
      <ContentBox>
        {hashTagState.map(([key, data]) => (
          <HashTagItemBox key={key}>
            <HashTagItem>{data}</HashTagItem>

            <DeleteButton onClick={() => handleHashTagDelete(key)}>
              <BiX />
            </DeleteButton>
          </HashTagItemBox>
        ))}
      </ContentBox>
    </Step>
  );
};

export default QuestionInfoForm;
