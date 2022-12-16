import { useState } from 'react';
import { MdArrowDropDown } from '@react-icons/all-files/md/MdArrowDropDown';
import { useQuery } from 'react-query';
import { getQuestion } from '../../../api/question';
import useInput from '../../../hooks/useInput';
import useToggle from '../../../hooks/useToggle';
import QUESTION_KEYS from '../../../react-query/keys/question';
import {
  QuestionItem,
  QuestionItemHashTagItem,
  QuestionItemHashTagList,
  QuestionItemTitle,
  QuestionItemUnderLine,
} from '../../../styles/questionList';
import { AddQuestion, GetSearchQuestionResponse } from '../../../types/question';
import DropDown from '../../common/dropdown';
import { DropdownItem } from '../../common/dropdown/Style';
import Loading from '../../common/Loading';
import { DropDownIcon, DropDownSelector, DropDownTitle } from '../createQuestion/Style';
import DROPBOX_LIST from './constants';
import {
  Container,
  SearchContainer,
  SearchInput,
  SearchButton,
  SearchDropDownContainer,
  SearchQuestionList,
  QuestionType,
  QuestionBox,
} from './Style';
import { QUESTION_TYPE } from '../../../utils/constants';

interface Props {
  handleQuestionAdd: (question: AddQuestion) => void;
}

interface SearchType {
  text: string;
  value: string;
}

const SearchQuestionModal = ({ handleQuestionAdd }: Props) => {
  const [searchType, setSearchType] = useState<SearchType>(DROPBOX_LIST[0]);
  const { text: searchValue, onChange: handleSearchInputChange } = useInput('');

  const [isSearch, handleSearchToggle] = useToggle(false);

  const { data, isLoading } = useQuery<GetSearchQuestionResponse>(
    QUESTION_KEYS.search,
    async () => {
      const result = await getQuestion({ type: searchType.value, value: searchValue });
      return result;
    },
    {
      enabled: isSearch,

      onSuccess: () => {
        handleSearchToggle();
      },
    },
  );

  const questionList = data?.data ?? [];

  return (
    <Container>
      <SearchContainer>
        <SearchDropDownContainer>
          <DropDown
            title={
              <DropDownSelector>
                <DropDownTitle>{searchType.text}</DropDownTitle>
                <DropDownIcon>
                  <MdArrowDropDown size={30} />
                </DropDownIcon>
              </DropDownSelector>
            }
            direction="right"
          >
            {DROPBOX_LIST.map((item) => {
              const { text } = item;

              return (
                <DropdownItem key={text} onClick={() => setSearchType(item)}>
                  {text}
                </DropdownItem>
              );
            })}
          </DropDown>
        </SearchDropDownContainer>
        <SearchInput
          onChange={handleSearchInputChange}
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleSearchToggle();
          }}
        />
        <SearchButton type="button" onClick={handleSearchToggle}>
          검색
        </SearchButton>
      </SearchContainer>

      <SearchQuestionList>
        {isLoading && <Loading />}
        {questionList.map((questionItem) => {
          const { questionId, question, hashtags } = questionItem;

          return (
            <QuestionItem key={questionId} onClick={() => handleQuestionAdd(questionItem)}>
              <QuestionBox>
                <QuestionItemTitle>{question}</QuestionItemTitle>
              </QuestionBox>
              <QuestionItemUnderLine>
                <QuestionItemHashTagList>
                  {hashtags.map((hashtag) => (
                    <QuestionItemHashTagItem key={hashtag}>{hashtag}</QuestionItemHashTagItem>
                  ))}
                </QuestionItemHashTagList>
              </QuestionItemUnderLine>
            </QuestionItem>
          );
        })}
      </SearchQuestionList>
    </Container>
  );
};

export default SearchQuestionModal;
