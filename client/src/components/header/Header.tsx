import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdArrowDropDown } from 'react-icons/md';
import { Button } from '../../styles/common';
import DropDown from '../common/dropdown/Dropdown';
import Logo from '../common/Logo';
import {
  ButtonList,
  Container,
  LogoInner,
  ButtonInner,
  InnerContainer,
  MobileContainer,
  SearchInput,
  SearchButton,
  SearchContainer,
  DropDownSelector,
  DropDownImage,
  DropDownIcon,
  DropDownContainer,
} from './Style';

const Header = () => {
  const [isToggle, setIsToggle] = useState(false);
  return (
    <Container>
      <InnerContainer>
        <LogoInner>
          <Logo />
        </LogoInner>

        <ButtonInner>
          <SearchContainer isToggle={isToggle}>
            <SearchInput placeholder="검색어를 입력하세요." />
            <SearchButton onClick={() => setIsToggle((prev) => !prev)}>
              <BiSearchAlt2 size={30} />
            </SearchButton>
          </SearchContainer>
          <ButtonList>
            {
              <>
                <Button>로그인</Button>
                <Button>회원가입</Button>
              </>
              // <DropDownContainer>
              //   <DropDown
              //     title={
              //       <DropDownSelector>
              //         <DropDownImage />
              //         <DropDownIcon>
              //           <MdArrowDropDown size={30} />
              //         </DropDownIcon>
              //       </DropDownSelector>
              //     }
              //     values={['마이페이지']}
              //     direction="right"
              //   />
              // </DropDownContainer>
            }
          </ButtonList>
        </ButtonInner>
      </InnerContainer>

      <MobileContainer>
        <SearchInput placeholder="검색어를 입력하세요." />
      </MobileContainer>
    </Container>
  );
};
export default Header;
