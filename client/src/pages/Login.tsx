import styled from 'styled-components';
import { colors, device } from '../styles/theme';
import githubIcon from '../assets/images/github-icon.png';
import googleIcon from '../assets/images/google-icon.png';
import kakaoIcon from '../assets/images/kakao-icon.png';
import naverIcon from '../assets/images/naver-icon.png';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  width: 440px;

  border: 1.5px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background: #fcfcfc;

  @media screen and (max-width: ${device.mobileWidth}) {
    width: 100%;
    border: none;
    box-shadow: none;
  }
`;

const Logo = styled.div`
  width: 100px;
  height: 50px;
`;
const ModalBody = styled.div`
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
const InputBox = styled.input`
  width: 200px;
  padding: 12px;
  margin: 12px 0px;

  border: 1px solid #d7d7d7;
  border-radius: 8px;

  :focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;
const LoginButton = styled.input`
  background: none;
  color: ${colors.secondary};
  border: 1px solid ${colors.secondary};
  border-radius: 8px;

  padding: 8px;
  width: 224px;

  :hover {
    background-color: ${colors.primary};
    color: white;
  }
`;
const MoreButtons = styled.div`
  margin: 12px;

  input {
    background: none;
    border: none;
    text-decoration: underline;
    color: ${colors.gray};

    :hover {
      opacity: 0.7;
    }
  }
`;

const SSOTitle = styled.div`
  margin: 12px;

  color: ${colors.gray};
  font-size: 14px;
`;

const SSOButtons = styled.div`
  img {
    margin: 12px 12px;
  }
`;

const SSOIcon = styled.img`
  width: 48px;
`;

const handleLocalLogin = {
  login: () => {
    /** */
  },
  findID: () => {
    /** */
  },
  findPW: () => {
    /** */
  },
  register: () => {
    /** */
  },
};

const handleSSO = {
  github: () => {
    /** */
  },
  google: () => {
    /** */
  },
  naver: () => {
    /** */
  },
  kakao: () => {
    /** */
  },
};

const Login = () => {
  return (
    <div>
      <Modal>
        <Logo>logo</Logo>
        <ModalBody>
          <form onSubmit={() => handleLocalLogin.login()}>
            <InputBox placeholder="아이디" />
            <InputBox placeholder="비밀번호" />
            <LoginButton type="submit" value="로그인" />
          </form>
          <MoreButtons>
            <input type="button" value="아이디 찾기" onClick={() => handleLocalLogin.findID()} />
            <input type="button" value="비밀번호 찾기" onClick={() => handleLocalLogin.findPW()} />
            <input type="button" value="회원가입" onClick={() => handleLocalLogin.register()} />
          </MoreButtons>
          <SSOTitle>간편로그인</SSOTitle>
          <SSOButtons>
            <SSOIcon src={githubIcon} alt="github" onClick={() => handleSSO.github()} />
            <SSOIcon src={googleIcon} alt="google" onClick={() => handleSSO.google()} />
            <SSOIcon src={naverIcon} alt="naver" onClick={() => handleSSO.naver()} />
            <SSOIcon src={kakaoIcon} alt="kakao" onClick={() => handleSSO.kakao()} />
          </SSOButtons>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
