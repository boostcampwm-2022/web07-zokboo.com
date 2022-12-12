import { WorkbookSearchData } from '../../../../types/workbook';
import { QuestionCount, Title, Workbook } from './Style';

const QuestionRangeWorkbook = ({ title, description, questionCount }: WorkbookSearchData) => {
  return (
    <Workbook>
      <Title>제목 : {title}</Title>
      <QuestionCount>문제 수 : {questionCount}</QuestionCount>
    </Workbook>
  );
};

export default QuestionRangeWorkbook;
