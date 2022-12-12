import styled from 'styled-components';
import { fonts, media, paddings, widths } from '../../styles/theme';

export const SearchResultContainer = styled.div`
  ${widths.base};

  box-sizing: border-box;
  margin: 80px auto 0px;
  padding: ${paddings.responsive};

  ${media.tablet} {
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Items = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
  /* gap: 20px; */
`;

export const SearchResultTitle = styled.div`
  font-size: ${fonts.size.xl};
`;
