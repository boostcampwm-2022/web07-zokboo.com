import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkbookSearchData } from '../../../../types/workbook';
import { QuestionCount, Title, Workbook } from './Style';

const QuestionRangeWorkbook = ({ title, workbookId, description, questionCount }: WorkbookSearchData) => {
  const navigate = useNavigate();
  const handleWorkbook = useCallback(() => {
    // 문제집 상세보기 페이지로 이동
    navigate(`/search/view?id=${workbookId}`);
  }, []);

  return (
    <Workbook>
      <Title type="button" onClick={handleWorkbook}>
        제목 : {title}
      </Title>
      <QuestionCount>문제 수 : {questionCount}</QuestionCount>
    </Workbook>
  );
};

export default QuestionRangeWorkbook;
