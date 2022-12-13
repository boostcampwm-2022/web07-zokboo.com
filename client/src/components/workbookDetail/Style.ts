import styled from 'styled-components';
import { colors, fonts } from '../../styles/theme';

export const ProblemDropdown = styled.details`
  margin-top: 12px;

  > * {
    padding: 10px 20px;
  }
`;

export const Header = styled.summary`
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.secondary};
  border-radius: 4px;
  margin-bottom: 8px;

  ::marker {
    display: none;
    content: ' ';
  }
`;

export const ProblemNumber = styled.div``;
export const QuestionType = styled.div<{ type: boolean }>`
  font-size: ${fonts.size.sm};
  font-weight: ${fonts.weight.semiBold};
  background-color: ${(props) => (props.type ? '#FEF2C0' : '#E99695')};
  color: black;
  padding: 1px 7px;
  display: inline-block;
  border-radius: 2em;
  margin: 0px 20px;
`;

export const Problem = styled.div`
  background-color: white;
`;

export const Title = styled.div`
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Options = styled.div``;

export const ProblemImg = styled.img`
  max-width: 350px;
  max-height: 350px;
`;

export const Difficulty = styled.div`
  color: ${colors.gray4};
  font-size: ${fonts.size.xs};
`;
export const VisibleToggle = styled.div`
  margin-top: 16px;
  width: fit-content;
  cursor: pointer;
`;
export const Answer = styled.div`
  color: ${colors.gray4};
  font-size: ${fonts.size.xs};
`;
export const Commentary = styled.div`
  color: ${colors.gray4};
  font-size: ${fonts.size.xs};
`;
export const Infos = styled.div`
  font-size: 14px;
`;
export const Hashtags = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 8px;

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
