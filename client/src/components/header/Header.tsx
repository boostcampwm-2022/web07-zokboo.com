import { useState } from 'react';
import ButtonComponent from '../common/Button';
import Logo from '../common/Logo';
import {
  HeaderButtonList,
  HeaderContainer,
  HeaderLogoInner,
  HeaderButtonInner,
  HeaderInnerContainer,
  HeaderLogo,
  HeaderMobileContainer,
  HeaderSearchInput,
  HeaderSearchButton,
  HeaderSearchContainer,
} from './Style';

import Search from '../../assets/images/search.png';

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <HeaderContainer>
      <HeaderInnerContainer>
        <HeaderLogoInner>
          <HeaderLogo>
            <Logo />
          </HeaderLogo>
        </HeaderLogoInner>

        <HeaderButtonInner>
          <HeaderSearchContainer isToggle={isToggle}>
            <HeaderSearchInput placeholder="검색어를 입력하세요." />
            <HeaderSearchButton onClick={() => setIsToggle((prev) => !prev)}>
              <img src={Search} alt="Search" />
            </HeaderSearchButton>
          </HeaderSearchContainer>
          <HeaderButtonList>
            <ButtonComponent buttonText="로그인" />
            <ButtonComponent buttonText="회원가입" />
          </HeaderButtonList>
        </HeaderButtonInner>
      </HeaderInnerContainer>

      <HeaderMobileContainer>
        <HeaderSearchInput placeholder="검색어를 입력하세요." />
      </HeaderMobileContainer>
    </HeaderContainer>
  );
};
export default Header;
