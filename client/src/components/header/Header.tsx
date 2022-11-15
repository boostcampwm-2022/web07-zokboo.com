import styled from 'styled-components';
import { colors, device } from '../../styles/theme';
import Logo from '../common/Logo';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  width: 70%;
  margin: 36px auto;
  /* margin: 36px 71px; */

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;

    margin: 36px 0;
  }
`;

const HeaderInner = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderNavList = styled.ul`
  display: flex;
  list-style: none;
`;

const HeaderSearch = styled.input`
  position: absolute;
  top: 180px;
  left: 0px;
  right: 0px;

  margin: 0 auto;

  width: 600px;
  height: 62px;

  border: 1px solid ${colors.primary};
  border-radius: 5px;

  box-sizing: border-box;

  padding: 0px 17px;

  font-size: 16px;
  color: ${colors.text};

  ::placeholder {
    color: ${colors.placeholder};
  }

  :focus {
    outline: none;
  }

  @media screen and (max-width: ${device.tablet}) {
    top: 80px;

    width: 90%;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInner>
        <Logo />
      </HeaderInner>
      <HeaderInner>
        <HeaderNavList />

        <HeaderSearch placeholder="검색어를 입력하세요." />
      </HeaderInner>
      <HeaderInner>Button</HeaderInner>
    </HeaderContainer>
  );
};
export default Header;
