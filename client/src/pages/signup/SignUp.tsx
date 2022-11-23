import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import useInput from '../../hooks/useInput';
import {
  InputAlert,
  InputBox,
  InputBoxContainer,
  InputContainer,
  InputTitle,
  Modal,
  ModalContainer,
  RegisterButton,
} from './Style';

const verification = {
  id: /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/,
  pw: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*=-])(?=.*[0-9]).{8,16}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
};

// ModalContainer > Modal > InputContainer > InputBoxContainer > InputBox 순의 구조로 설계하긴 했는데요,,
// 좀 가독성이 떨어지는 느낌..? inpu
const SignUp = () => {
  const [idValue, onIdChange, isIdCorrectInput] = useInput('', verification.id);
  const [pwValue, onPwChange, isPwCorrectInput] = useInput('', verification.pw);
  const [pwCheckValue, onPwCheckChange, isPwCheckCorrectInput] = useInput('', verification.pw);
  const [emailValue, onEmailChange, isEmailCorrectInput] = useInput('', verification.email);
  const [visibleInputPw, setVisibleInputPw] = useState<boolean>(false);
  const [visibleInputPwCheck, setVisibleInputPwCheck] = useState<boolean>(false);

  return (
    <div>
      <ModalContainer>
        <Modal>
          회원가입
          <InputContainer>
            <InputTitle>아이디</InputTitle>
            <InputBox
              type="text"
              placeholder="영문 소문자, 숫자 조합 6-16자"
              onChange={onIdChange}
              value={idValue}
              isCorrect={isIdCorrectInput !== null || idValue === ''}
            />
            {isIdCorrectInput !== null || idValue === '' ? null : (
              <InputAlert>아이디는 영문 소문자, 숫자 조합 6-16자 여야합니다.</InputAlert>
            )}
          </InputContainer>
          <InputContainer>
            <InputTitle>비밀번호</InputTitle>
            <InputBoxContainer>
              <InputBox
                type={visibleInputPw ? 'text' : 'password'}
                placeholder="영문, 숫자, 특수기호 조합 8-16자"
                onChange={onPwChange}
                value={pwValue}
                isCorrect={isPwCorrectInput !== null || pwValue === ''}
              />

              <div role="presentation" onClick={() => setVisibleInputPw((prev) => !prev)}>
                {visibleInputPw ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </InputBoxContainer>
            {isPwCorrectInput !== null || pwValue === '' ? null : (
              <InputAlert>비밀번호는 영문,숫자,특수기호 조합 8-16자 여야합니다.</InputAlert>
            )}
            <InputBoxContainer>
              <InputBox
                type={visibleInputPwCheck ? 'text' : 'password'}
                placeholder="비밀번호 재입력"
                onChange={onPwCheckChange}
                value={pwCheckValue}
                isCorrect={pwValue === pwCheckValue || pwCheckValue === ''}
              />
              <div role="presentation" onClick={() => setVisibleInputPwCheck((prev) => !prev)}>
                {visibleInputPwCheck ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </InputBoxContainer>
            {pwValue === pwCheckValue || pwCheckValue === '' ? null : (
              <InputAlert>비밀번호가 일치하지 않습니다.</InputAlert>
            )}
          </InputContainer>
          <InputContainer>
            <InputTitle>이메일</InputTitle>
            <InputBoxContainer>
              <InputBox
                type="text"
                placeholder="이메일"
                onChange={onEmailChange}
                value={emailValue}
                isCorrect={isEmailCorrectInput !== null || emailValue === ''}
              />
            </InputBoxContainer>
            {isEmailCorrectInput !== null || emailValue === '' ? null : (
              <InputAlert>이메일 주소가 올바르지 않습니다.</InputAlert>
            )}
          </InputContainer>
          <RegisterButton
            type="button"
            value="회원가입"
            disabled={
              isIdCorrectInput !== null &&
              isPwCorrectInput !== null &&
              isPwCheckCorrectInput !== null &&
              isEmailCorrectInput !== null &&
              pwValue === pwCheckValue
            }
          />
        </Modal>
      </ModalContainer>
    </div>
  );
};

export default SignUp;
