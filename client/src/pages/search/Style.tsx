import styled from 'styled-components';
import { colors, device, paddings } from '../../styles/theme';

export const SearchResultContainer = styled.div`
  width: 80%;
  //max-width: 800px;

  box-sizing: border-box;
  margin: 80px auto 0px;
  padding: ${paddings.responsive};

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const RadioContainer = styled.fieldset`
  border: 1px solid ${colors.gray3};
  border-radius: 8px;
  padding: 4px 6px;

  color: ${colors.gray4};
  font-size: 14px;

  display: flex;
  align-items: center;
`;

export const SearchResultTitle = styled.div``;
