import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
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
  email: /[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
  certifiedNumber: /.*$/, // 인증번호도 입력값 검증이 필요할까?
};

const SignUp = () => {
  const [idValue, onIdChange, isIdCorrectInput] = useInput('', verification.id);
  const [pwValue, onPwChange, isPwCorrectInput] = useInput('', verification.pw);
  const [pwCheckValue, onPwCheckChange, isPwCheckCorrectInput] = useInput('', verification.pw);
  const [emailValue, onEmailChange, isEmailCorrectInput] = useInput('', verification.email);
  const [certifiedNumberValue, onCertifiedNumberChange, isCertifiedNumberCorrectInput] = useInput(
    '',
    verification.certifiedNumber,
  );
  const [visibleInputPw, setVisibleInputPw] = useState<boolean>(false);
  const [visibleInputPwCheck, setVisibleInputPwCheck] = useState<boolean>(false);
  const [visibleCertifiedNumberInput, setVisibleCertifiedNumberInput] = useState<boolean>(false);
  const [isCorrectCertifiedNumber, setIsCorrectCertifiedNumber] = useState<boolean>(false);

  const handleIsCorrectCheck = {
    id: () => {
      return isIdCorrectInput || idValue === '';
    },
    pw: () => {
      return isPwCorrectInput || pwValue === '';
    },
    pwCheck: () => {
      return pwValue === pwCheckValue || pwCheckValue === '';
    },
    email: () => {
      return isEmailCorrectInput || emailValue === '';
    },
    certifiedNumber: () => {
      return isCertifiedNumberCorrectInput || certifiedNumberValue === '';
    },
  };

  const handleSendEmail = () => {
    /** 중복이메일 검사 로직 + 인증메일 보내는 로직 */

    alert('인증번호가 발송되었습니다.');
    setVisibleCertifiedNumberInput(true);
  };

  const handleCheckCertifiedNumber = () => {
    /** 인증번호 검증하는 로직 */
    alert('인증번호가 확인되었습니다.');
    setIsCorrectCertifiedNumber(true);
  };

  const handleSignup = () => {
    /** 중복아이디 검사 로직 */
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
              name="idInput"
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
                name="password"
              />

              <div role="presentation" className="pwToggleVisible" onClick={() => setVisibleInputPw((prev) => !prev)}>
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
              <div
                role="presentation"
                className="pwCheckToggleVisible"
                onClick={() => setVisibleInputPwCheck((prev) => !prev)}
              >
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
              <Button type="button" value="인증번호 전송" onClick={handleSendEmail} disabled={!isEmailCorrectInput} />
            </InputBoxContainer>
            {handleIsCorrectCheck.email() ? null : <InputAlert>이메일 주소가 올바르지 않습니다.</InputAlert>}
          </InputContainer>
          {visibleCertifiedNumberInput ? (
            <InputContainer>
              <InputTitle>인증번호</InputTitle>
              <InputBoxContainer>
                <InputBox
                  type="text"
                  placeholder="인증번호"
                  onChange={onCertifiedNumberChange}
                  value={certifiedNumberValue}
                  isCorrect={handleIsCorrectCheck.certifiedNumber()}
                />
                <Button
                  type="button"
                  value="확인"
                  onClick={handleCheckCertifiedNumber}
                  disabled={!isCertifiedNumberCorrectInput}
                  data-testid="certifiedNumberCheck"
                />
              </InputBoxContainer>
            </InputContainer>
          ) : null}
          <Button
            type="button"
            value="회원가입"
            data-testid="signup"
            onClick={handleSignup}
            disabled={
              !isIdCorrectInput ||
              !isPwCorrectInput ||
              !isPwCheckCorrectInput ||
              !isEmailCorrectInput ||
              !isCertifiedNumberCorrectInput ||
              !isCorrectCertifiedNumber ||
              !(pwValue === pwCheckValue)
            }
          />
        </Modal>
      </ModalContainer>
    </div>
  );
};

export default SignUp;
