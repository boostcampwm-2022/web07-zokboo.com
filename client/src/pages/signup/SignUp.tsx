import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import ButtonComponent from '../../components/common/Button';
import useInput from '../../hooks/useInput';
import {
  Button,
  InputAlert,
  InputBox,
  InputBoxContainer,
  InputContainer,
  InputTitle,
  Modal,
  ModalContainer,
} from './Style';

const verification = {
  id: /^(?=.*[a-z])(?=.*[0-9]).{6,16}$/,
  pw: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*=-])(?=.*[0-9]).{8,16}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
};

const SignUp = () => {
  const [idValue, onIdChange, isIdCorrectInput] = useInput('', verification.id);
  const [pwValue, onPwChange, isPwCorrectInput] = useInput('', verification.pw);
  const [pwCheckValue, onPwCheckChange, isPwCheckCorrectInput] = useInput('', verification.pw);
  const [emailValue, onEmailChange, isEmailCorrectInput] = useInput('', verification.email);
  const [visibleInputPw, setVisibleInputPw] = useState<boolean>(false);
  const [visibleInputPwCheck, setVisibleInputPwCheck] = useState<boolean>(false);

  const handleIsCorrectCheck = {
    id: () => {
      return isIdCorrectInput !== null || idValue === '';
    },
    pw: () => {
      return isPwCorrectInput !== null || pwValue === '';
    },
    pwCheck: () => {
      return pwValue === pwCheckValue || pwCheckValue === '';
    },
    email: () => {
      return isEmailCorrectInput !== null || emailValue === '';
    },
  };

  const handleSignup = () => {
    alert('회원가입이 완료되었습니다.');
    window.location.href = '/login';
  };

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
              isCorrect={handleIsCorrectCheck.id()}
            />
            {handleIsCorrectCheck.id() ? null : (
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
                isCorrect={handleIsCorrectCheck.pw()}
              />

              <div role="presentation" onClick={() => setVisibleInputPw((prev) => !prev)}>
                {visibleInputPw ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </InputBoxContainer>
            {handleIsCorrectCheck.pw() ? null : (
              <InputAlert>비밀번호는 영문,숫자,특수기호 조합 8-16자 여야합니다.</InputAlert>
            )}
            <InputBoxContainer>
              <InputBox
                type={visibleInputPwCheck ? 'text' : 'password'}
                placeholder="비밀번호 재입력"
                onChange={onPwCheckChange}
                value={pwCheckValue}
                isCorrect={handleIsCorrectCheck.pwCheck()}
              />
              <div role="presentation" onClick={() => setVisibleInputPwCheck((prev) => !prev)}>
                {visibleInputPwCheck ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
              </div>
            </InputBoxContainer>
            {handleIsCorrectCheck.pwCheck() ? null : <InputAlert>비밀번호가 일치하지 않습니다.</InputAlert>}
          </InputContainer>
          <InputContainer>
            <InputTitle>이메일</InputTitle>
            <InputBoxContainer>
              <InputBox
                type="text"
                placeholder="이메일"
                onChange={onEmailChange}
                value={emailValue}
                isCorrect={handleIsCorrectCheck.email()}
              />
            </InputBoxContainer>
            {handleIsCorrectCheck.email() ? null : <InputAlert>이메일 주소가 올바르지 않습니다.</InputAlert>}
          </InputContainer>
          <Button
            type="button"
            value="회원가입"
            onClick={handleSignup}
            disabled={
              isIdCorrectInput === null ||
              isPwCorrectInput === null ||
              isPwCheckCorrectInput === null ||
              isEmailCorrectInput === null ||
              pwValue !== pwCheckValue
            }
          />
        </Modal>
      </ModalContainer>
    </div>
  );
};

export default SignUp;
