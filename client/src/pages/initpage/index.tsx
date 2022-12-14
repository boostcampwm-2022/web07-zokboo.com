import { useNavigate } from 'react-router-dom';
import ModalContainer from '../../components/login/LoginModal';
import { Content, Copyright, LoginButton, Logo, PageBackground } from './Style';

const InitPage = () => {
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate('/login');
  };
  return (
    <div>
      <PageBackground />
      <ModalContainer title={<Logo src="https://kr.object.ncloudstorage.com/asset.image/logo.svg" alt="" />}>
        <Content>
          📚 직접 문제를 만들고 풀 수 있는,
          <br />
          👨‍👩‍👧‍👦 다른 사람의 문제도 풀 수 있는,
          <br />
          👔 시험과 면접 준비에 도움이 되는,
          <br />
          족부닷컴 등장!
        </Content>
        <LoginButton
          buttonText="로그인하러가기"
          buttonWidth="100%"
          buttonHeight="48px"
          handleButton={handleLoginButton}
        />
        <Copyright>Copyright 2022. WorldCon Team all rights reserved.</Copyright>
      </ModalContainer>
    </div>
  );
};

export default InitPage;
