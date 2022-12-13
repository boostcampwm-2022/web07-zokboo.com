import styled from 'styled-components';
import { colors, fonts } from '../../../../styles/theme';

export const SearchResult = styled.div``;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Title = styled.div`
  font-size: ${fonts.size.lg};
  font-weight: ${fonts.weight.semiBold};
  padding-bottom: 8px;
  margin-left: 4px;
`;
export const ProblemCount = styled.div`
  font-size: ${fonts.size.xs};
  color: ${colors.gray4};
`;

export const Timer = styled.div`
  font-size: ${fonts.size.xs};
  color: ${colors.gray4};
`;

export const QuestionRange = styled.details`
  margin-top: 10px;

  summary {
    font-weight: ${fonts.weight.semiBold};
    cursor: pointer;
    ::marker {
      display: none;
      content: '';
    }
  }
`;
