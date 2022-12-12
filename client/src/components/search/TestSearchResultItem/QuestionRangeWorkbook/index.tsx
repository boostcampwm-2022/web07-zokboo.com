import styled from 'styled-components';
import { colors, fonts } from '../../../../styles/theme';
import { WorkbookSearchData } from '../../../../types/workbook';

const Workbook = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${colors.gray4};
  margin: 10px 0px;
`;

const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  width: 80%;

  font-size: ${fonts.size.sm};
`;

const QuestionCount = styled.div`
  width: 20%;
  color: ${colors.gray4};
  font-size: ${fonts.size.sm};
`;

const QuestionRangeWorkbook = ({ title, description, questionCount }: WorkbookSearchData) => {
  return (
    <Workbook>
      <Title>제목 : {title}</Title>
      <QuestionCount>문제 수 : {questionCount}</QuestionCount>
    </Workbook>
  );
};

export default QuestionRangeWorkbook;
