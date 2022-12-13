import { useState } from 'react';
import { MdArrowDropDown } from '@react-icons/all-files/md/MdArrowDropDown';
import { useQuery } from 'react-query';
import { getQuestion } from '../../../api/question';
import useInput from '../../../hooks/useInput';
import useToggle from '../../../hooks/useToggle';
import QUESTION_KEYS from '../../../react-query/keys/question';
import {
  ProblemItem,
  ProblemItemHashTagItem,
  ProblemItemHashTagList,
  ProblemItemTitle,
  ProblemItemUnderLine,
} from '../../../styles/problemList';
import { GetQuestionResponse, AddQuestion } from '../../../types/question';
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
  SearchProblemList,
} from './Style';

interface Props {
  handleProblemAdd: (problem: AddQuestion) => void;
}

interface SearchType {
  text: string;
  value: string;
}

const SearchProblemModal = ({ handleProblemAdd }: Props) => {
  const [searchType, setSearchType] = useState<SearchType>(DROPBOX_LIST[0]);
  const { text: searchValue, onChange: handleSearchInputChange } = useInput('');

  const [isSearch, handleSearchToggle] = useToggle(false);

  const { data: problemList = [], isLoading } = useQuery<GetQuestionResponse[]>(
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

      <SearchProblemList>
        {isLoading && <Loading />}
        {problemList.map((problem) => {
          const { questionId, question, hashtags } = problem;

          return (
            <ProblemItem key={questionId} onClick={() => handleProblemAdd(problem)}>
              <ProblemItemTitle>{question}</ProblemItemTitle>
              <ProblemItemUnderLine>
                <ProblemItemHashTagList>
                  {hashtags.map((hashtag) => (
                    <ProblemItemHashTagItem key={hashtag}>{hashtag}</ProblemItemHashTagItem>
                  ))}
                </ProblemItemHashTagList>
              </ProblemItemUnderLine>
            </ProblemItem>
          );
        })}
      </SearchProblemList>
    </Container>
  );
};

export default SearchProblemModal;
