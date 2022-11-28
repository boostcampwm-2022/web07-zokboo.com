import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors, fonts, media } from '../../styles/theme';

export const HomeDashBoard = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-bottom: 60px;

  ${media.tablet} {
    margin-bottom: 30px;
  }
`;

export const ItemContainer = styled(Link)`
  display: flex;

  width: 22%;
  height: 120px;

  box-sizing: border-box;
  padding: 15px;

  border-radius: 10px;
  background-color: ${colors.secondary};

  color: ${colors.text};

  cursor: pointer;
  text-decoration-line: none;

  ${media.tablet} {
    width: 45%;
    margin-top: 10px;
  }
`;

export const ItemInfo = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  width: 65%;

  h3 {
    margin: 0;
    font-size: ${fonts.size.lg};
  }

  p {
    font-size: ${fonts.size.lg};
    margin: 8px 0;

    span {
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xxl};
    }
  }
`;

export const ItemImageBox = styled.div`
  display: flex;
  align-items: center;

  width: 35%;
  height: 100%;
  img {
    width: 100%;
    max-width: 100px;
  }
`;
