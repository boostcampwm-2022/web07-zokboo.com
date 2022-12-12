import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Item, List } from '../../styles/common';
import { colors, fonts, media, paddings, widths } from '../../styles/theme';

export const Container = styled.div`
  ${widths.base};
  padding: ${paddings.responsive};

  display: flex;
  justify-content: space-between;

  margin: 80px auto 0;

  ${media.tablet} {
    width: ${widths.responsive};

    margin: 0 0 10px;
    flex-direction: column;
  }
`;

export const Title = styled.h1`
  strong {
    color: ${colors.primary};
    font-weight: ${fonts.weight.bold};
  }
`;

export const SideContainer = styled.div`
  width: 300px;

  ${media.tablet} {
    margin-top: 20px;

    display: flex;
    width: 100%;
  }

  ${media.mobileWidth} {
    flex-direction: column;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 20px 0;

  border-top: 2px solid ${colors.primary};
`;

export const UserImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  overflow: hidden;

  width: 90px;
  height: 90px;

  border: 1px solid ${colors.line};
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
`;
export const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: calc(100% - 90px);

  padding: 0 10px;

  span {
    color: ${colors.primary};
    font-size: ${fonts.size.lg};
    font-weight: ${fonts.weight.bold};
    width: 100%;
  }
`;
export const LinkList = styled.div`
  padding: 30px 10px;

  border-top: 1px solid ${colors.line};
`;

export const MyPageLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;

  width: 100%;
  height: 50px;

  color: ${colors.primary};
  background-color: ${colors.white};
  border: 1px solid ${colors.primary};
  border-radius: 10px;

  :hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }

  :last-child {
    margin-top: 10px;
  }
`;

export const CategoryTitle = styled.h2`
  font-size: ${fonts.size.sm};
`;

export const CategoryList = styled(List)`
  border-top: 1px solid ${colors.line};
  border-bottom: 1px solid ${colors.line};
`;

export const CategoryLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: ${colors.text};
  text-decoration: none;

  font-size: ${fonts.size.lg};

  margin: 10px 0;
  padding: 10px 10px;

  :hover {
    background-color: ${colors.gray1};
  }

  cursor: pointer;
`;

export const CategoryItem = styled(Item)<{ isActive: boolean }>`
  ${CategoryLink} {
    ${(props) => props.isActive && `background-color: ${colors.gray1};`}
  }
`;

export const ContentsContainer = styled.div`
  width: calc(100% - 300px - 20px);
  height: 600px;
  ${media.tablet} {
    width: 100%;
  }
`;

export const MobileContainer = styled.div`
  ${media.tablet} {
    width: 50%;
  }

  ${media.mobileWidth} {
    width: 100%;
  }
`;
