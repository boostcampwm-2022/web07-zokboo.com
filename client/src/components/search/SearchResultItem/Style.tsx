import styled from 'styled-components';
import { colors, fonts, media } from '../../../styles/theme';

export const SearchResultItemContainer = styled.div`
  border: 1px solid ${colors.gray3};
  border-radius: 4px;
  box-shadow: 2px 2px ${colors.gray1};
  padding: 16px 12px;
  margin: 20px 0px;
  .more-button {
    float: right;
  }
  ${media.mobileWidth} {
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid ${colors.gray3};
    box-shadow: none;
  }
`;

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
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 16px;
`;

export const Buttons = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 14px;
  color: ${colors.gray4};
  > * {
    padding: 4px;
  }
  .fillStyled {
    color: ${colors.primary};
  }
`;

export const Heart = styled.button`
  background: none;
  border: none;
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
