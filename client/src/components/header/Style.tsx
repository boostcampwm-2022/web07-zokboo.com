import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Input } from '../../styles/common';
import { colors, fonts, media, paddings, widths } from '../../styles/theme';

export const Container = styled.header`
  border-bottom: 1px solid ${colors.gray1};
  padding: 10px 0;
`;

export const InnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  ${widths.base};
  padding: ${paddings.responsive};

  margin: 0 auto;

  ${media.tablet} {
    width: ${widths.responsive};

    margin: 0 0 10px;
  }
`;

export const SearchInput = styled(Input)`
  width: 100%;
  height: 50px;

  border: 1px solid ${colors.primary};
  border-radius: 5px;

  box-sizing: border-box;

  padding: 0px 17px;
  margin: 0 0 0 20px;
`;

export const ButtonList = styled.div`
  display: flex;
  justify-content: flex-end;

  width: auto;

  button {
    margin-left: 10px;
  }
`;

export const UserData = styled.div``;

export const UserAvatar = styled.img`
  width: 20px;
`;

export const AuthLink = styled(Link)`
  color: ${colors.primary};
  border: 1px solid ${colors.primary};
  background-color: ${colors.white};
  border-radius: 5px;

  font-size: ${fonts.size.sm};

  padding: 2px 5px;
  margin-left: 10px;
  text-decoration: none;

  transition: all 0.5s;
  cursor: pointer;

  :hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }

  ${media.mobileLength} {
    font-size: ${fonts.size.xs};
  }
`;

export const SearchButton = styled.button`
  position: relative;
  z-index: 2;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  width: 30px;
  height: 30px;

  border: 1px solid ${colors.primary};
  background-color: ${colors.white};
  border-radius: 50%;

  color: ${colors.primary};
`;

export const SearchContainer = styled.div<{ isToggle: boolean }>`
  position: relative;

  display: flex;
  justify-content: end;
  align-items: center;

  width: calc(100% - 170px);
  height: 55px;

  ${SearchInput} {
    position: absolute;

    right: -8px;

    width: ${(props) => (props.isToggle ? `100%` : `0`)};
    opacity: ${(props) => (props.isToggle ? `1` : `0`)};

    transition: all 1s;
  }

  ${media.tablet} {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  display: none;

  height: 50px;

  margin: ${paddings.responsive};
  padding: 0 10px;

  ${SearchInput} {
    position: absolute;
    left: 0;

    width: 100%;
    margin: 0;
  }

  ${media.tablet} {
    position: relative;

    display: flex;
    justify-content: end;
    align-items: center;
  }
`;

export const LogoInner = styled.div`
  display: flex;
  align-items: center;

  width: 350px;
  height: 100%;

  ${media.tablet} {
    width: 200px;
  }
`;

export const ButtonInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  width: calc(100% - 350px);
  height: 100%;

  ${media.tablet} {
    width: calc(100% - 200px);
  }
`;

export const DropDownContainer = styled.div`
  width: 70px;

  margin-left: 10px;
  cursor: pointer;
`;

export const DropDownSelector = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
`;

export const DropDownImage = styled.img`
  width: 40px;
  height: 40px;

  border: 1px solid ${colors.gray1};
  border-radius: 50%;
`;

export const DropDownIcon = styled.div`
  width: 30px;
`;

export const DropDownLink = styled(Link)`
  display: block;

  height: 100%;
  width: 100%;

  color: ${colors.text};
  text-decoration: none;
`;
