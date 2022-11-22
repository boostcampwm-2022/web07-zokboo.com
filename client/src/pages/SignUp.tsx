import React, { useState } from 'react';
import styled from 'styled-components';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { colors, device } from '../styles/theme';
import useInput from '../hooks/useInput';

const ModalContainer = styled.div`
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

  padding: 12px;

  @media screen and (max-width: ${device.mobileWidth}) {
    width: 100%;
    border: none;
    box-shadow: none;
  }
`;

const Modal = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin: 12px 0px;
`;

const InputTitle = styled.div`
  font-size: 12px;
`;

const InputBoxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
`;

const InputBox = styled.input`
  padding: 12px;
  margin: 4px 0px;

  width: 100%;

  border: 1px solid #d7d7d7;
  border-radius: 8px;

  :focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;
const RegisterButton = styled.input<{ isActive: boolean }>`
  background: none;
  color: ${colors.white};
  border: 1px solid ${colors.secondary};
  border-radius: 8px;
  background: ${(props) => (props.isActive ? colors.primary : colors.secondary)};

  padding: 8px;
`;

const SignUp = () => {
  const [idValue, onIdChange] = useInput('');
  const [pwValue, onPwChange] = useInput('');
  const [pwCheckValue, onPwCheckChange] = useInput('');
  const [visibleInputPw, setVisibleInputPw] = useState<boolean>(false);
  const [visibleInputPwCheck, setVisibleInputPwCheck] = useState<boolean>(false);

  return (
    <div>
      <ModalContainer>
        <Modal>
          회원가입
          <InputContainer>
            <InputTitle>아이디</InputTitle>

            <InputBox type="text" placeholder="영문, 숫자 8-16자" onChange={onIdChange} />
          </InputContainer>
          <InputContainer>
            <InputTitle>비밀번호</InputTitle>
            <InputBoxContainer>
              <InputBox
                type={visibleInputPw ? 'text' : 'password'}
                placeholder="영문, 숫자 8-16자"
                onChange={onPwChange}
              />
              <div role="presentation" onClick={() => setVisibleInputPw((prev) => !prev)}>
                {visibleInputPw ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </InputBoxContainer>
            <InputBoxContainer>
              <InputBox
                type={visibleInputPwCheck ? 'text' : 'password'}
                placeholder="비밀번호 재입력"
                onChange={onPwCheckChange}
              />
              <div role="presentation" onClick={() => setVisibleInputPwCheck((prev) => !prev)}>
                {visibleInputPwCheck ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </InputBoxContainer>
          </InputContainer>
          <RegisterButton
            type="button"
            value="회원가입"
            isActive={idValue !== '' && pwValue !== '' && pwCheckValue !== ''}
          />
        </Modal>
      </ModalContainer>
    </div>
  );
};

export default SignUp;
