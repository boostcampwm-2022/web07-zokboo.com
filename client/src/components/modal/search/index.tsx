import { useState } from 'react';
import {
  ProblemItem,
  ProblemItemHashTagItem,
  ProblemItemHashTagList,
  ProblemItemTitle,
  ProblemItemUnderLine,
  ProblemList,
} from '../../../styles/problemList';
import { Problem } from '../../../types/workbook';
import { Container, SearchBox, SearchInput, SearchButton } from './Style';

interface Props {
  handleProblemAdd: (problem: Problem) => void;
}

const SearchProblemModal = ({ handleProblemAdd }: Props) => {
  const [problemList, setProblemList] = useState<Problem[]>([]);

  return (
    <Container>
      <SearchBox>
        <SearchInput />
        <SearchButton type="button">검색</SearchButton>
      </SearchBox>

      <ProblemList>
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
      </ProblemList>
    </Container>
  );
};

export default SearchProblemModal;
