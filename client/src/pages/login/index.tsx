import React from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Logo from '../../components/common/logo';
import githubIcon from '../../assets/images/github-icon.png';
import googleIcon from '../../assets/images/google-icon.png';
import kakaoIcon from '../../assets/images/kakao-icon.png';
import naverIcon from '../../assets/images/naver-icon.png';
import {
  InputBox,
  LoginButton,
  Modal,
  ModalBody,
  MoreButtons,
  RedirectButton,
  SSOButtons,
  SSOIcon,
  SSOTitle,
} from './Style';
import { getLocalLoginData, getSSOData } from '../../api/login';
import { GITHUB, GOOGLE, KAKAO, NAVER } from './constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUserData, signinSuccess } from '../../redux/login/slice';

const Login = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);

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
      console.log(data);
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

    // eslint-disable-next-line no-shadow
    const email = (document.getElementById('email') as HTMLInputElement).value;

    // eslint-disable-next-line no-shadow
    const pw = (document.getElementById('password') as HTMLInputElement).value;

    loginMutation.mutate([email, pw]);
  };

  return (
    <div>
      <Modal>
        <Logo type="large" />
        <ModalBody>
          <form onSubmit={handleLogin}>
            <InputBox type="text" placeholder="이메일" id="email" name="email" maxLength={30} />
            <InputBox type="password" placeholder="비밀번호" id="password" name="password" maxLength={30} />
            <LoginButton type="submit" value="로그인" />
          </form>
          <MoreButtons>
            <RedirectButton to="/find_id">아이디 찾기</RedirectButton>
            <RedirectButton to="/find_pw">비밀번호 찾기</RedirectButton>
            <RedirectButton to="/signup">회원가입</RedirectButton>
          </MoreButtons>
          <SSOTitle>간편로그인</SSOTitle>
          <SSOButtons>
            <SSOIcon src={githubIcon} alt="github" onClick={() => SSOMutation.mutate(GITHUB)} />
            <SSOIcon src={googleIcon} alt="google" onClick={() => SSOMutation.mutate(GOOGLE)} />
            <SSOIcon src={naverIcon} alt="naver" onClick={() => SSOMutation.mutate(NAVER)} />
            <SSOIcon src={kakaoIcon} alt="kakao" onClick={() => SSOMutation.mutate(KAKAO)} />
          </SSOButtons>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
