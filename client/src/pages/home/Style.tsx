import styled from 'styled-components';
import { colors, device, fonts, paddings, widths } from '../../styles/theme';

export const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: ${widths.base};

  box-sizing: border-box;
  margin: 100px auto 0px;
  padding: ${paddings.responsive};

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};
    margin: 50px auto 0px;
  }
`;

export const HomeTitle = styled.h1`
  font-size: ${fonts.size.xxl};
  span {
    color: ${colors.primary};
  }
`;
