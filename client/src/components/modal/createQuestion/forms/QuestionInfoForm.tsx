import { useEffect, useState } from 'react';
import { BiImageAdd } from '@react-icons/all-files/bi/BiImageAdd';
import { BiX } from '@react-icons/all-files/bi/BiX';
import { toast } from 'react-toastify';
import useArrayText from '../../../../hooks/useArrayText';
import { Input, SubTitle, TextArea } from '../../../../styles/common';
import { QUESTION_TYPE } from '../../../../utils/constants';
import { ALLOW_FILE_EXTENSION, FILE_SIZE_MAX_LIMIT } from '../constants';
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
  questionType: string;
  hashTagList: string[];
  image: File | null;
}

interface FieldProps {
  question: string;
  image: File | null;
  questionType: string;
  hashTagList: string[];
}

type Props = InfoData & {
  updateFields: (fields: Partial<FieldProps>) => void;
};

const QuestionInfoForm = ({ question, questionType, image, hashTagList, updateFields }: Props) => {
  const {
    state: hashTagState,
    values: hashTagValues,
    add: handleHashTagAdd,
    erase: handleHashTagDelete,
    reset: handleHashTagListReset,
  } = useArrayText();
  const [renderImage, setRenderImage] = useState('');

  const handleHashTagAddCheck = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const hashTag = target.hashtag as HTMLInputElement;

    handleHashTagAdd(hashTag.value);
    target.reset();
  };

  const loadingImage = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      const fileUrl = reader.result;

      if (typeof fileUrl === 'string') {
        setRenderImage(fileUrl);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const { files } = target;

    if (!files) {
      return;
    }

    const uploadFile = files[0];
    if (!ALLOW_FILE_EXTENSION.includes(uploadFile.type.replace('image/', ''))) {
      toast.error(`?????? ????????? ???????????? ????????????. (????????? ????????? : ${ALLOW_FILE_EXTENSION.join(' ')})`);
      target.value = '';
      return;
    }

    if (uploadFile.size > FILE_SIZE_MAX_LIMIT) {
      toast.error('????????? ????????? ?????? ????????? 5MB?????????.');
      target.value = '';
      return;
    }

    loadingImage(uploadFile);
    updateFields({ image: uploadFile });
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

  useEffect(() => {
    if (!image) {
      setRenderImage('');
    }
  }, [image]);

  return (
    <Step>
      <SubTitle>?????? ??????</SubTitle>
      <TextArea
        id="question"
        rows={4}
        placeholder="????????? ???????????????."
        value={question}
        onChange={(e) => updateFields({ question: e.target.value })}
      />

      <SubTitle>?????? ?????????</SubTitle>
      <Label htmlFor="file">
        <Input type="file" hidden id="file" onChange={handleFileUpload} />
        <ImageBox isShow={renderImage !== ''}>
          <BiImageAdd size={50} />
          <img src={renderImage} alt="question" />
        </ImageBox>
      </Label>
      <TitleBox>
        <SubTitle>?????? ??????</SubTitle>
      </TitleBox>

      <ContentBox>
        <ModalButton
          type="button"
          isDisplay
          isActive={questionType === QUESTION_TYPE.subjective}
          value={QUESTION_TYPE.subjective}
          onClick={() => updateFields({ questionType: QUESTION_TYPE.subjective })}
        >
          ?????????
        </ModalButton>
        <ModalButton
          type="button"
          isDisplay
          isActive={questionType === QUESTION_TYPE.multiple}
          value={QUESTION_TYPE.multiple}
          onClick={() => updateFields({ questionType: QUESTION_TYPE.multiple })}
        >
          ?????????
        </ModalButton>
      </ContentBox>

      <TitleBox>
        <SubTitle>???????????? ??????</SubTitle>
        {hashTagState.length < 5 && (
          <HashTagForm onSubmit={handleHashTagAddCheck}>
            <QuestionInput id="hashtag" />
            <HashTagButton type="submit">??????</HashTagButton>
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
