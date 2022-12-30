import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Logo from '../../components/common/logo';
import { InputBox, LoginButton, ModalBody, MoreButtons, RedirectButton, SSOButtons, SSOIcon, SSOTitle } from './Style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signin, signinSuccess } from '../../redux/user/slice';
import ModalContainer from '../../components/login/LoginModal';
import { getSSOData } from '../../api/auth';
import { GITHUB, KAKAO, NAVER, URL } from './constants';
import selectUserData from '../../redux/user/selector';

const Login = () => {
  // userData 안에 isLoading, isSuccess 등 상태값이 들어있으므로
  // 로딩처리, 에러처리 등등의 기능들이 saga에서도 가능하다.
  // 보통은 react-query처럼 const {isLoading, isSuccess, ...} 이런식으로 선언한다.
  const { isSuccess, isError, error } = useAppSelector(selectUserData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');
  const type = searchParams.get('type');

  const SSOMutation = useMutation(getSSOData, {
    // TODO : SSO 로그인도 redux saga로 바꾸기
    onSuccess: (data) => {
      toast.success('로그인에 성공하였습니다.');
      dispatch(signinSuccess({ isLogined: true, ...data.data }));
      navigate('/');
    },
    onError: (message: string) => {
      toast.error(message);
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess]);

  useEffect(() => {
    if (isError) toast.error(error);
  }, [isError]);

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
            {/* <SSOIcon
              src="https://kr.object.ncloudstorage.com/asset.image/google-icon.svg"
              alt="google"
              onClick={() => {
                window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE}&redirect_uri=${URL}login?type=google&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`;
              }}
            /> */}
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
