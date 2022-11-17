import { useEffect } from 'react';
import styled from 'styled-components';
import { device } from '../styles/theme';

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
const FindIdContainer = styled.div``;
const FindPwContainer = styled.div``;
const SelectWhatFind = styled.div``;
const FindIdButton = styled.input``;
const FindPwButton = styled.input``;

const ModalTitle = styled.div``;
const InputEmail = styled.input``;

const FindId = () => {
  return (
    <div>
      <Modal>
        <FindIdContainer>
          <ModalTitle>아이디 찾기</ModalTitle>
          <form>
            <input type="text" name="email" placeholder="이메일" required />
            <input type="submit" />
          </form>
        </FindIdContainer>
        <hr style={{ width: '70%' }} />
        <FindPwContainer>
          <ModalTitle>비밀번호 찾기</ModalTitle>
          <form>
            <input type="text" name="id" placeholder="아이디" required />
            <input type="text" name="email" placeholder="이메일" required />
            <input type="submit" />
          </form>
        </FindPwContainer>
      </Modal>
    </div>
  );
};

export default FindId;
