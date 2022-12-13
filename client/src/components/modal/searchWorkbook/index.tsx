import { useState } from 'react';
import { AiFillCaretDown } from '@react-icons/all-files/ai/AiFillCaretDown';
import { AiFillCaretUp } from '@react-icons/all-files/ai/AiFillCaretUp';
import { useQuery } from 'react-query';
import { getWorkbookListByTitle } from '../../../api/workbook';
import useInput from '../../../hooks/useInput';
import useToggle from '../../../hooks/useToggle';
import WORKBOOK_KEYS from '../../../react-query/keys/workbook';
import { GetWorkbookListByTitleResponse, Workbook } from '../../../types/workbook';
import Loading from '../../common/Loading';
import {
  Container,
  SearchButton,
  SearchContainer,
  SearchInput,
  SearchWorkbookItem,
  SearchWorkbookList,
  InfoBox,
  InfoTitle,
  InfoDesc,
  InfoButton,
  InfoContainer,
  QuestionItem,
  QuestionList,
} from './Style';

interface Props {
  handleWorkbookAdd: (workbook: Workbook) => void;
}

const SearchWorkbookModal = ({ handleWorkbookAdd }: Props) => {
  const { text: titleValue, onChange: handleTitleChange } = useInput('');
  const [questionToggleList, setQuestionToggleList] = useState<boolean[]>([]);
  const [isSearch, handleSearchToggle] = useToggle(false);

  const { data: response, isLoading } = useQuery<GetWorkbookListByTitleResponse>(
    WORKBOOK_KEYS.searchTitle,
    async () => {
      const result = await getWorkbookListByTitle(titleValue);

      return result;
    },
    {
      enabled: isSearch,

      onSuccess: ({ data }: GetWorkbookListByTitleResponse) => {
        handleSearchToggle();
        setQuestionToggleList(new Array(data.length).fill(false));
      },
    },
  );

  const workbookList = response?.data ?? [];
  console.log(workbookList);

  const handleQuestionToggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.stopPropagation();

    setQuestionToggleList((prev) => prev.map((data, idx) => (idx === index ? !data : data)));
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          value={titleValue}
          onChange={handleTitleChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleSearchToggle();
          }}
        />
        <SearchButton onClick={handleSearchToggle}>검색</SearchButton>
      </SearchContainer>

      <SearchWorkbookList>
        {isLoading && <Loading />}
        {workbookList.map((workbook, idx) => {
          const { workbookId, title, description, questions } = workbook;
          return (
            <SearchWorkbookItem key={workbookId} onClick={() => handleWorkbookAdd(workbook)}>
              <InfoContainer>
                <InfoBox>
                  <InfoTitle>{title}</InfoTitle>
                  <InfoDesc>{description}</InfoDesc>
                </InfoBox>

                <InfoButton onClick={(e) => handleQuestionToggle(e, idx)}>
                  {questionToggleList[idx] ? <AiFillCaretUp size={16} /> : <AiFillCaretDown size={16} />}
                </InfoButton>
              </InfoContainer>

              <QuestionList isToggle={questionToggleList[idx]}>
                {/* {questions.map((questionItem) => {
                  const { questionId, question } = questionItem;
                  return <QuestionItem key={questionId}>{question}</QuestionItem>;
                })} */}
              </QuestionList>
            </SearchWorkbookItem>
          );
        })}
      </SearchWorkbookList>
    </Container>
  );
};

export default SearchWorkbookModal;
