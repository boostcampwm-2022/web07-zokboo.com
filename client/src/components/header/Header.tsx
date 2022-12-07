import { useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { MdArrowDropDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import selectUserData from '../../redux/login/selector';
import { signoutSuccess } from '../../redux/login/slice';
import { Button } from '../../styles/common';
import ButtonComponent from '../common/Button';
import DropDown from '../common/dropdown/Dropdown';
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
  UserData,
  UserAvatar,
} from './Style';
import DefaultAvatar from '../../images/default-avatar.jpg';

const Header = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
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
          <Logo type="large" />
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
              userData.isLogined ? (
                <>
                  <UserData>
                    <UserAvatar src={userData.avatar ? userData.avatar : DefaultAvatar} alt="" />
                    <div>{userData.nickname}</div>
                  </UserData>
                  <ButtonComponent
                    handleButton={() => dispatch(signoutSuccess())}
                    buttonText="로그아웃"
                    buttonWidth="80px"
                  />
                </>
              ) : (
                <>
                  <AuthLink to="login">로그인</AuthLink>
                  <AuthLink to="signup">회원가입</AuthLink>
                </>
              )

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
