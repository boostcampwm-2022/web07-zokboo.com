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
          π μ§μ  λ¬Έμ λ₯Ό λ§λ€κ³  ν μ μλ,
          <br />
          π¨βπ©βπ§βπ¦ λ€λ₯Έ μ¬λμ λ¬Έμ λ ν μ μλ,
          <br />
          π μνκ³Ό λ©΄μ  μ€λΉμ λμμ΄ λλ,
          <br />
          μ‘±λΆλ·μ»΄ λ±μ₯!
        </Content>
        <LoginButton
          buttonText="λ‘κ·ΈμΈνλ¬κ°κΈ°"
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
