import styled from 'styled-components';
import { colors, fonts } from '../../../styles/theme';

export const ItemTitle = styled.div``;
export const ItemExplain = styled.div`
  font-size: 12px;
  color: ${colors.gray4};
  padding: 8px 0px;
`;

export const Infos = styled.div`
  font-size: ${fonts.size.xs};
  color: ${colors.gray4};
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 16px;
`;

export const ContentButtons = styled.div`
  float: right;
  > * {
    margin: 0px 0px 0px 24px;
    padding: 4px;
    background: none;
    border: 1px solid ${colors.primary};
    border-radius: 4px;
    color: ${colors.primary};
    :hover {
      opacity: 0.7;
    }
  }
`;
export const TestButton = styled.input``;
export const SaveButton = styled.input``;
