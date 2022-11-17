import styled from 'styled-components';
import { colors, device, paddings, widths } from '../../styles/theme';
import Logo from '../common/Logo';

const HeaderContainer = styled.header`
  border-bottom: 1px solid ${colors.gray1};
  padding: 10px 0;
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: ${widths.base};

  margin: 0 auto;

  @media screen and (max-width: ${device.tablet}) {
    width: ${widths.responsive};

    margin: 0;
  }
`;

const HeaderSearch = styled.input`
  width: calc(100% - 100px);
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

const HeaderInner = styled.div<{ width: string }>`
  display: flex;
  align-items: center;

  width: ${(props) => props.width};

  padding: ${paddings.responsive};

  @media screen and (max-width: ${device.tablet}) {
    ${HeaderSearch} {
      display: none;
    }
  }
`;

const HeaderMobileContainer = styled.div`
  position: absolute;
  top: 90px;
  left: 0;
  right: 0;

  display: none;

  padding: ${paddings.responsive};

  ${HeaderSearch} {
    width: 100%;
    margin: 0;
  }

  @media screen and (max-width: ${device.tablet}) {
    display: flex;
    justify-content: center;
  }
`;

const HeaderLogo = styled.div`
  width: 350px;

  @media screen and (max-width: ${device.tablet}) {
    width: 200px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderInner width="80%">
          <HeaderLogo>
            <Logo />
          </HeaderLogo>
          <HeaderSearch placeholder="검색어를 입력하세요." />
        </HeaderInner>

        <HeaderMobileContainer>
          <HeaderSearch placeholder="검색어를 입력하세요." />
        </HeaderMobileContainer>

        <HeaderInner width="100px">Button</HeaderInner>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};
export default Header;
