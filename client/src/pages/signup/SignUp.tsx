import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useInput from '../../hooks/useInput';
import {
  InputBox,
  InputBoxContainer,
  InputContainer,
  InputTitle,
  Modal,
  ModalContainer,
  RegisterButton,
} from './Style';

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
