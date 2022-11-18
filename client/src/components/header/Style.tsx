import styled from 'styled-components';
import { colors, device, paddings, widths } from '../../styles/theme';

export const HeaderContainer = styled.header`
  border-bottom: 1px solid ${colors.gray1};
  padding: 10px 0;
`;

export const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: ${widths.base};
  padding: ${paddings.responsive};

  margin: 0 auto;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};

    margin: 0 0 10px;
  }
`;

export const HeaderSearchInput = styled.input`
  width: 100%;
  height: 50px;

  border: 1px solid ${colors.primary};
  border-radius: 5px;

  box-sizing: border-box;

  padding: 0px 17px;
  margin: 0 0 0 20px;

  font-size: 16px;
  color: ${colors.text};

  ::placeholder {
    color: ${colors.placeholder};
  }

  :focus {
    outline: none;
  }
`;

export const HeaderMobileContainer = styled.div`
  display: none;

  padding: ${paddings.responsive};

  ${HeaderSearchInput} {
    width: 100%;
    margin: 0;
  }

  @media screen and (max-width: ${device.tablet}) {
    display: flex;
    justify-content: center;
  }
`;

export const HeaderLogo = styled.div``;

export const HeaderButtonList = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 170px;

  button {
    margin-left: 10px;
  }
`;

export const HeaderSearchButton = styled.button`
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

  img {
    width: 100%;
  }
`;

export const HeaderSearchContainer = styled.div<{ isToggle: boolean }>`
  position: relative;

  display: flex;
  justify-content: end;
  align-items: center;

  width: calc(100% - 170px);
  height: 55px;

  ${HeaderSearchInput} {
    position: absolute;

    right: -10px;

    width: ${(props) => (props.isToggle ? `100%` : `0`)};
    opacity: ${(props) => (props.isToggle ? `1` : `0`)};

    transition: all 1s;
  }

  @media screen and (max-width: ${device.tablet}) {
    display: none;
  }
`;

export const HeaderLogoInner = styled.div`
  display: flex;
  align-items: center;

  width: 350px;
  height: 100%;

  @media screen and (max-width: ${device.tablet}) {
    width: 200px;
  }
`;

export const HeaderButtonInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;

  width: calc(100% - 350px);
  height: 100%;

  @media screen and (max-width: ${device.tablet}) {
    width: calc(100% - 200px);
  }
`;
