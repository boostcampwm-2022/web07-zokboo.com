import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Logo from '../../components/common/logo';
import githubIcon from '../../assets/images/github-icon.png';
import googleIcon from '../../assets/images/google-icon.png';
import kakaoIcon from '../../assets/images/kakao-icon.png';
import naverIcon from '../../assets/images/naver-icon.png';
import { InputBox, LoginButton, Modal, ModalBody, MoreButtons, SSOButtons, SSOIcon, SSOTitle } from './Style';
import SSORequest from '../../api/login';
import { DEV_SERVER_URL } from '../../utils/constants';

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
  const [emailValue, setEmailValue] = useState<string>('');
  const [pwValue, setPwValue] = useState<string>('');

  const handleLocalLogin = {
    login: async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await axios
        .post(`${DEV_SERVER_URL}/auth/signin`, { email: emailValue, password: pwValue })
        .then((res) => {
          alert('로그인 되었습니다.');
          window.location.href = '/';
        })
        .catch((err) => {
          const errorMessage = err.response.data.message;
          toast.error(errorMessage);
        });
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

  return (
    <div>
      <Modal>
        <Logo type="large" />
        <ModalBody>
          <form onSubmit={handleLocalLogin.login}>
            <InputBox
              type="text"
              placeholder="이메일"
              name="id"
              maxLength={30}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <InputBox
              type="password"
              placeholder="비밀번호"
              name="pw"
              maxLength={30}
              value={pwValue}
              onChange={(e) => setPwValue(e.target.value)}
            />
            <LoginButton type="submit" value="로그인" />
          </form>
          <MoreButtons>
            <input type="button" value="아이디 찾기" onClick={handleLocalLogin.findID} />
            <input type="button" value="비밀번호 찾기" onClick={handleLocalLogin.findPW} />
            <input type="button" value="회원가입" onClick={handleLocalLogin.register} />
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
