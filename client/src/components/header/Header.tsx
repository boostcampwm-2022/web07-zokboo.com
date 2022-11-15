import styled from 'styled-components';
import { colors, device } from '../../styles/theme';

const HeaderContainer = styled.header`
  border-bottom: 1px solid ${colors.offWhite};
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.08);
`;

const HeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: relative;

  width: 80%;
  margin: 0 auto;

  @media screen and (max-width: ${device.tablet}) {
    width: 100%;

    margin: 0 0;
  }
`;

const HeaderInner = styled.div<{ width: string }>`
  display: flex;
  align-items: center;

  width: ${(props) => props.width};

  .template_logo {
    display: flex;
    align-items: center;

    width: 150px;
    height: 70px;

    div {
      width: 150px;
      height: 60px;
      background-color: ${colors.primary};
    }
  }
`;

const HeaderSearch = styled.input`
  width: calc(100% - 150px);
  height: 50px;

  border: 1px solid ${colors.primary};
  border-radius: 5px;

  box-sizing: border-box;

  padding: 0px 17px;
  margin: 0 0 0 50px;

  font-size: 16px;
  color: ${colors.text};

  ::placeholder {
    color: ${colors.placeholder};
  }

  :focus {
    outline: none;
  }

  @media screen and (max-width: ${device.tablet}) {
    top: 120px;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderInner width="80%">
          {/* <Logo /> */}
          <div className="template_logo">
            <div>Zok</div>
          </div>
          <HeaderSearch placeholder="검색어를 입력하세요." />
        </HeaderInner>

        <HeaderInner width="100px">Button</HeaderInner>
      </HeaderInnerContainer>
    </HeaderContainer>
  );
};
export default Header;
