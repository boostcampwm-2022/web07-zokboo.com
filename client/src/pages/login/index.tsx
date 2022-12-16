import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../../components/common/logo';
import { InputBox, LoginButton, ModalBody, MoreButtons, RedirectButton, SSOButtons, SSOIcon, SSOTitle } from './Style';
import { useAppDispatch } from '../../redux/hooks';
import { signinSuccess } from '../../redux/user/slice';
import ModalContainer from '../../components/login/LoginModal';
import { getLocalLoginData, getSSOData } from '../../api/auth';
import { GITHUB, GOOGLE, KAKAO, NAVER, URL } from './constants';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const type = searchParams.get('type');

  const SSOMutation = useMutation(getSSOData, {
    onSuccess: (data) => {
      toast.success('로그인에 성공하였습니다.');
      dispatch(signinSuccess({ isLogined: true, ...data.data }));
      navigate('/');
    },
    onError: (message: string) => {
      toast.error(message);
    },
  });

  const loginMutation = useMutation(getLocalLoginData, {
    onSuccess: (data) => {
      toast.success('로그인에 성공하였습니다.');
      dispatch(signinSuccess({ isLogined: true, ...data.data }));
      navigate('/');
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

  useEffect(() => {
    if (code && type) {
      SSOMutation.mutate({ SSOType: type, code });
    }
  }, []);

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
              src="https://kr.object.ncloudstorage.com/asset.image/github-icon.svg"
              alt="github"
              onClick={() => {
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB}&redirect_uri=${URL}login?type=github`;
              }}
            />
            <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/google-icon.svg"
              alt="google"
              onClick={() => {
                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE}&redirect_uri=${URL}login?type=google&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`;
              }}
            />
            <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/naver-icon.svg"
              alt="naver"
              onClick={() => {
                window.location.href = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER}&redirect_uri=${URL}login?type=naver&state=ascaso1233dc`;
              }}
            />
            <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/kakao-icon.svg"
              alt="kakao"
              onClick={() => {
                window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&redirect_uri=${URL}login?type=kakao&client_id=${KAKAO}`;
              }}
            />
          </SSOButtons>
        </ModalBody>
      </ModalContainer>
    </div>
  );
};

export default Login;
