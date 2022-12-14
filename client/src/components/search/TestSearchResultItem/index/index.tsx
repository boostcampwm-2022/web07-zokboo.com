import { IoMdArrowDropdown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { TestListSearchData } from '../../../../types/test';
import SearchResultContainer from '../../../common/searchResultContainer';
import QuestionRangeWorkbook from '../QuestionRangeWorkbook';
import { ProblemCount, QuestionRange, SearchResult, Timer, Title, TitleContainer } from './Style';

const TestSearchResultItem = ({ testId, title, totalCount, minutes, seconds, workbooks }: TestListSearchData) => {
  const navigate = useNavigate();

  return (
    <SearchResultContainer handleClick={() => navigate(`/test?testId=${testId}`)}>
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
            시험범위 📚
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
