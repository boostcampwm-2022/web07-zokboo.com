import { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
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
import { Problem } from '../../../types/workbook';
import DropDown from '../../common/dropdown/Dropdown';
import { DropdownItem } from '../../common/dropdown/Style';
import { DropDownIcon, DropDownSelector, DropDownTitle } from '../create/Style';
import { Container, SearchBox, SearchInput, SearchButton, SearchDropDownContainer, SearchProblemList } from './Style';

interface Props {
  handleProblemAdd: (problem: Problem) => void;
}

interface SearchType {
  text: string;
  value: string;
}

const DROPBOX_LIST = [
  { text: '해쉬태그', value: 'hashtag' },
  { text: '문제명', value: 'text' },
];

const SearchProblemModal = ({ handleProblemAdd }: Props) => {
  const [problemList, setProblemList] = useState<Problem[]>([]);
  const [searchType, setSearchType] = useState<SearchType>(DROPBOX_LIST[0]);
  const [searchInput, handleSearchInputChange] = useInput('');

  const [isSearch, handleSerachToggle] = useToggle(false);

  const search = useQuery(
    QUESTION_KEYS.search,
    async () => {
      const result = await getQuestion({ type: searchType.value, value: searchInput });
      return result;
    },
    {
      enabled: isSearch,

      onSuccess: () => {
        handleSerachToggle();
      },
    },
  );

  console.log(search);

  return (
    <Container>
      <SearchBox>
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
              const { text, value } = item;

              return (
                <DropdownItem key={text} onClick={() => setSearchType(item)}>
                  {text}
                </DropdownItem>
              );
            })}
          </DropDown>
        </SearchDropDownContainer>
        <SearchInput onChange={handleSearchInputChange} />
        <SearchButton type="button" onClick={handleSerachToggle}>
          검색
        </SearchButton>
      </SearchBox>

      <SearchProblemList>
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
