import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

export const ProblemDropdown = styled.details`
  margin-top: 12px;

  > * {
    padding: 10px 20px;
  }
`;

export const ProblemNumber = styled.summary`
  white-space: nowrap;
  overflow: hidden;

  background-color: ${colors.secondary};
  border-radius: 4px;
  margin-bottom: 8px;

  ::marker {
    display: none;
    content: '🔽  ';
  }
`;

export const Problem = styled.div`
  background-color: white;
`;

export const ProblemTitle = styled.div`
  font-weight: 700;
`;

export const ProblemImg = styled.img`
  max-width: 350px;
  max-height: 350px;
`;

export const ProblemDifficulty = styled.div`
  color: ${colors.gray4};
  font-size: ${fonts.size.xs};
`;
export const ProblemCommentary = styled.div`
  color: ${colors.gray4};
  font-size: ${fonts.size.xs};
`;
export const ProblemHashtags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 8px;

  font-size: 14px;

  > * {
    font-size: 12px;

    border: none;
    border-radius: 4px;

    margin: 0 4px;
    padding: 2px 4px;

    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;
