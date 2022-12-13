import React from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Logo from '../../components/common/logo';
import githubIcon from '../../assets/images/github-icon.png';
import googleIcon from '../../assets/images/google-icon.png';
import kakaoIcon from '../../assets/images/kakao-icon.png';
import naverIcon from '../../assets/images/naver-icon.png';
import { InputBox, LoginButton, ModalBody, MoreButtons, RedirectButton, SSOButtons, SSOIcon, SSOTitle } from './Style';

import { GITHUB, GOOGLE, KAKAO, NAVER } from './constants';
import { useAppDispatch } from '../../redux/hooks';
import { signinSuccess } from '../../redux/login/slice';
import ModalContainer from '../../components/login/LoginModal';
import { getLocalLoginData, getSSOData } from '../../api/auth';

const Login = () => {
  const dispatch = useAppDispatch();

  const SSOMutation = useMutation(getSSOData, {
    onSuccess: (data) => {
      alert('로그인에 성공하였습니다.');
      dispatch(signinSuccess({ isLogined: true, ...data.data }));
      window.location.href = '/';
    },
    onError: (message: string) => {
      toast.error(message);
    },
  });

  const loginMutation = useMutation(getLocalLoginData, {
    onSuccess: (data) => {
      alert('로그인에 성공하였습니다.');
      dispatch(signinSuccess({ isLogined: true, ...data.data }));
      window.location.href = '/';
    },
    onError: (message: string) => {
      toast.error(message);
      (document.getElementById('password') as HTMLInputElement).value = '';
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const pw = (document.getElementById('password') as HTMLInputElement).value;

    loginMutation.mutate({ email, password: pw });
  };

  return (
    <div>
      <ModalContainer title={<Logo type="large" />}>
        <ModalBody>
          <form onSubmit={handleLogin}>
            <InputBox type="text" placeholder="이메일" id="email" name="email" maxLength={30} />
            <InputBox type="password" placeholder="비밀번호" id="password" name="password" maxLength={30} />
            <LoginButton type="submit" value="로그인" />
          </form>
          <MoreButtons>
            {/* <RedirectButton to="/find_id">아이디 찾기</RedirectButton> */}
            <RedirectButton to="/find_pw">비밀번호 찾기</RedirectButton>
            <RedirectButton to="/signup">회원가입</RedirectButton>
          </MoreButtons>
          <SSOTitle>간편로그인</SSOTitle>
          <SSOButtons>
            <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/github-icon.png"
              alt="github"
              onClick={() => SSOMutation.mutate(GITHUB)}
            />
            <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/google-icon.png"
              alt="google"
              onClick={() => SSOMutation.mutate(GOOGLE)}
            />
            <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/naver-icon.png"
              alt="naver"
              onClick={() => SSOMutation.mutate(NAVER)}
            />
            <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/kakao-icon.png"
              alt="kakao"
              onClick={() => SSOMutation.mutate(KAKAO)}
            />
          </SSOButtons>
        </ModalBody>
      </ModalContainer>
    </div>
  );
};

export default Login;
