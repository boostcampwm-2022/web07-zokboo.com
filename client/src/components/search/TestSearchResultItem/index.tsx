import styled from 'styled-components';
import { IoMdArrowDropdown } from 'react-icons/io';
import { colors, fonts } from '../../../styles/theme';
import { TestListSearchData } from '../../../types/test';
import SearchResultContainer from '../../common/searchResultContainer';
import QuestionRangeWorkbook from './QuestionRangeWorkbook';

const SearchResult = styled.div``;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Title = styled.div`
  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.semiBold};
  padding-bottom: 8px;
  margin-left: 4px;
`;
const ProblemCount = styled.div`
  font-size: ${fonts.size.xs};
  color: ${colors.gray4};
`;

const Timer = styled.div`
  font-size: ${fonts.size.xs};
  color: ${colors.gray4};
`;

const QuestionRange = styled.details`
  margin-top: 10px;

  summary {
    font-weight: ${fonts.weight.semiBold};
    ::marker {
      display: none;
      content: '';
    }
  }
`;

const TestSearchResultItem = ({ testId, title, totalCount, minutes, seconds, workbooks }: TestListSearchData) => {
  return (
    <SearchResultContainer>
      <SearchResult>
        <TitleContainer>
          <div>제목 :</div>
          <Title> {title}</Title>
        </TitleContainer>

        <ProblemCount>문제 수 : {totalCount}</ProblemCount>
        <Timer>
          제한 시간 : {minutes}분 {seconds}초
        </Timer>
        <QuestionRange>
          <summary>
            <IoMdArrowDropdown />
            문제집들 📚
          </summary>

          {workbooks.map((x, i) => {
            const { workbookId, title: workbookTitle, description, questionCount } = x.workbook;
            return (
              <QuestionRangeWorkbook
                key={workbookId}
                workbookId={workbookId}
                title={workbookTitle}
                description={description}
                questionCount={questionCount}
              />
            );
          })}
        </QuestionRange>
      </SearchResult>
    </SearchResultContainer>
  );
};

export default TestSearchResultItem;
