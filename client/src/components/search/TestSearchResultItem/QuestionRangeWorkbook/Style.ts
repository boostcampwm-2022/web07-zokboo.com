import styled from 'styled-components';
import { colors, fonts } from '../../../../styles/theme';

export const Workbook = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${colors.gray4};
  margin: 10px 0px;
`;

export const Title = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  width: 80%;

  font-size: ${fonts.size.sm};
`;

export const QuestionCount = styled.div`
  width: 20%;
  color: ${colors.gray4};
  font-size: ${fonts.size.sm};
`;
