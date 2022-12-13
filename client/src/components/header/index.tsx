import { useState } from 'react';
import { BiSearchAlt2 } from '@react-icons/all-files/bi/BiSearchAlt2';
import { MdArrowDropDown } from '@react-icons/all-files/md/MdArrowDropDown';
import { useNavigate, Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectUserData from '../../redux/login/selector';
import { signoutSuccess } from '../../redux/login/slice';
import DropDown from '../common/dropdown';
import Logo from '../common/logo';
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
  DropDownLink,
} from './Style';
import DefaultAvatar from '../../images/default-avatar.jpg';
import { DropdownItem } from '../common/dropdown/Style';

const Header = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const [isToggle, handleToggle] = useToggle(false);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearchWorkbook = () => {
    // navigate(`/search?q=${input}`);
    window.location.href = `/search?q=${input}`;
  };

  const handleSearchToggle = () => {
    if (isToggle && input) handleSearchWorkbook();
    else handleToggle();
  };

  const handleLogout = () => {
    dispatch(signoutSuccess());
  };

  return (
    <Container>
      <InnerContainer>
        <LogoInner>
          <Logo type="large" />
        </LogoInner>

        <ButtonInner>
          <SearchContainer isToggle={isToggle}>
            <SearchInput
              placeholder="검색어를 입력하세요."
              onKeyUp={(e) => {
                if (e.key === 'Enter') handleSearchWorkbook();
              }}
              onChange={(e) => setInput(e.target.value)}
            />
            <SearchButton onClick={handleSearchToggle}>
              <BiSearchAlt2 size={30} />
            </SearchButton>
          </SearchContainer>
          <ButtonList>
            {userData.isLogined ? (
              <DropDownContainer>
                <DropDown
                  title={
                    <DropDownSelector>
                      <DropDownImage src={userData.avatar ? userData.avatar : DefaultAvatar} />
                      <DropDownIcon>
                        <MdArrowDropDown size={30} />
                      </DropDownIcon>
                    </DropDownSelector>
                  }
                  direction="right"
                >
                  <DropdownItem>
                    <DropDownLink to="/mypage">마이페이지</DropDownLink>
                  </DropdownItem>
                  <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
                </DropDown>
              </DropDownContainer>
            ) : (
              <>
                <AuthLink to="/login">로그인</AuthLink>
                <AuthLink to="/signup">회원가입</AuthLink>
              </>
            )}
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
