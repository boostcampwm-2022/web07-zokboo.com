import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
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
  AuthLink,
} from './Style';

const Header = () => {
  const [isToggle, handleToggle] = useToggle(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearchWorkbook = () => {
    navigate(`/search?q=${input}`);
  };

  const handleSearchToggle = () => {
    if (isToggle) handleSearchWorkbook();
    else handleToggle();
  };

  return (
    <Container>
      <InnerContainer>
        <LogoInner>
          <Logo />
        </LogoInner>

        <ButtonInner>
          <SearchContainer isToggle={isToggle}>
            <SearchInput placeholder="검색어를 입력하세요." onChange={(e) => setInput(e.target.value)} />
            <SearchButton onClick={handleSearchToggle}>
              <BiSearchAlt2 size={30} />
            </SearchButton>
          </SearchContainer>
          <ButtonList>
            {
              <>
                <AuthLink to="login">로그인</AuthLink>
                <AuthLink to="signup">회원가입</AuthLink>
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
        <SearchInput placeholder="검색어를 입력하세요." onChange={(e) => setInput(e.target.value)} />
        <SearchButton onClick={handleSearchWorkbook}>
          <BiSearchAlt2 size={30} />
        </SearchButton>
      </MobileContainer>
    </Container>
  );
};
export default Header;
