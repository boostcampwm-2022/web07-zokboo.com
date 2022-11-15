import styled from 'styled-components';
import { colors } from '../styles/theme';

const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;

  width: 440px;
  height: 280px;

  border: 1.5px solid #c1c1c1;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background: #fcfcfc;
`;

const Logo = styled.div``;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
`;
const InputBox = styled.input``;
const MoreButtons = styled.div``;
const OSSButtons = styled.div``;
const Login = () => {
  return (
    <div>
      <Modal>
        <Logo>logo</Logo>
        <ModalBody>
          <InputBox placeholder="아이디" />
          <InputBox placeholder="비밀번호" />
          <input type="button" value="로그인" />
          <MoreButtons>
            <input type="button" value="아이디 찾기" />
            <input type="button" value="비밀번호 찾기" />
            <input type="button" value="회원가입" />
          </MoreButtons>
          <div>간편로그인</div>
          <OSSButtons>
            <input type="button" value="naver" />
            <input type="button" value="google" />
            <input type="button" value="github" />
            <input type="button" value="kakao" />
          </OSSButtons>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
