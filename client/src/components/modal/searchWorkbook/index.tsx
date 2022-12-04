import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import useToggle from '../../../hooks/useToggle';
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

const SearchWorkbookModal = () => {
  const [toggle, setToggle] = useToggle(false);
  return (
    <Container>
      <SearchContainer>
        <SearchInput /> <SearchButton>검색</SearchButton>
      </SearchContainer>

      <SearchWorkbookList>
        <SearchWorkbookItem>
          <InfoContainer>
            <InfoBox>
              <InfoTitle>문제집 제목</InfoTitle>
              <InfoDesc>
                문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집
                설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명
                문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집 설명 문제집
                설명 문제집 설명 문제집 설명 문제집 설명
              </InfoDesc>
            </InfoBox>

            <InfoButton onClick={setToggle}>
              <AiFillCaretDown size={16} />
              {/* <AiFillCaretUp /> */}
            </InfoButton>
          </InfoContainer>

          <QuestionList isToggle={toggle}>
            <QuestionItem>
              123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123
            </QuestionItem>
            <QuestionItem>
              123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123
            </QuestionItem>
            <QuestionItem>
              123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123
            </QuestionItem>
            <QuestionItem>
              123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123
            </QuestionItem>
          </QuestionList>
        </SearchWorkbookItem>
      </SearchWorkbookList>
    </Container>
  );
};

export default SearchWorkbookModal;
