import styled from 'styled-components';
import { SubTitle } from '../../styles/common';
import { colors, fonts, media, paddings, widths } from '../../styles/theme';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${widths.base};

  box-sizing: border-box;
  margin: 80px auto 0px;
  padding: ${paddings.responsive};

  ${media.tablet} {
    width: ${widths.responsive};
    margin: 10px auto 0px;
  }
`;

export const HomeTitle = styled(SubTitle)`
  font-size: ${fonts.size.xxl};

  strong {
    color: ${colors.primary};
  }
`;
