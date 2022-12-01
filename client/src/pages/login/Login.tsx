import axios from 'axios';
import Logo from '../../components/common/Logo';
import githubIcon from '../../assets/images/github-icon.png';
import googleIcon from '../../assets/images/google-icon.png';
import kakaoIcon from '../../assets/images/kakao-icon.png';
import naverIcon from '../../assets/images/naver-icon.png';
import { InputBox, LoginButton, Modal, ModalBody, MoreButtons, SSOButtons, SSOIcon, SSOTitle } from './Style';
import SSORequest from '../../api/login';

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
    window.location.href = '/signup';
  },
};

const handleSSO = {
  github: () => {
    window.location.href = 'https://zokboo.shop/auth/github';
  },
  google: () => {
    window.location.href = 'https://zokboo.shop/auth/google';
  },
  naver: () => {
    window.location.href = 'https://zokboo.shop/auth/naver';
  },
  kakao: async () => {
    await axios.get(`https://zokboo.shop/auth/kakao`).then((res) => {
      /** 임시 */
      console.log(res);
    });
  },
};

const Login = () => {
  return (
    <div>
      <Modal>
        <Logo />
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
