import styled from 'styled-components';
import { colors, fonts, media, paddings, widths } from '../../styles/theme';

export const Container = styled.div`
  width: ${widths.base};
  padding: ${paddings.responsive};

  margin: 0 auto;

  ${media.tablet} {
    width: ${widths.responsive};

    margin: 0 0 10px;
  }
`;

export const Title = styled.h1`
  strong {
    color: ${colors.primary};
    font-weight: ${fonts.weight.bold};
  }
`;
