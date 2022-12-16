import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import { MAX_INPUT_LENGTH } from './constants';
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
import { VERIFICATION } from '../../utils/constants';
import ToggleVisible from '../../components/login/ToggleVisible';
import { postSignup } from '../../api/auth';
import Logo from '../../components/common/logo';

const SignUp = () => {
  const navigate = useNavigate();
  const { text: nickValue, onChange: onNickChange, correct: isNickCorrectInput } = useInput('');
  const { text: pwValue, onChange: onPwChange, correct: isPwCorrectInput } = useInput('', VERIFICATION.pw);
  const {
    text: pwCheckValue,
    onChange: onPwCheckChange,
    correct: isPwCheckCorrectInput,
  } = useInput('', VERIFICATION.pw);
  const { text: emailValue, onChange: onEmailChange, correct: isEmailCorrectInput } = useInput('', VERIFICATION.email);
  const [visibleInputPw, setVisibleInputPw] = useState<boolean>(false);
  const [visibleInputPwCheck, setVisibleInputPwCheck] = useState<boolean>(false);
  const { mutate: signupMutate } = useMutation(postSignup);
  const handleSignup = async () => {
    signupMutate(
      {
        email: emailValue,
        password: pwValue,
        passwordConfirmation: pwCheckValue,
        nickname: nickValue,
      },
      {
        onSuccess: () => {
          // alert('회원가입이 완료되었습니다.\n입력하신 이메일에서 인증을 진행해주세요.');
          navigate('/login');
        },
      },
    );
  };

  const handleIsCorrectCheck = {
    nick: () => {
      return isNickCorrectInput || nickValue === '';
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
  };

  return (
    <ModalContainer>
      <Modal>
        <Logo type="large" />
        <InputContainer>
          <InputTitle>이메일</InputTitle>
          <InputBoxContainer>
            <InputBox
              type="text"
              placeholder="이메일"
              onChange={onEmailChange}
              value={emailValue}
              isCorrect={handleIsCorrectCheck.email()}
              maxLength={MAX_INPUT_LENGTH}
            />
          </InputBoxContainer>
          <InputAlert>{handleIsCorrectCheck.email() ? null : '이메일 주소가 올바르지 않습니다.'}</InputAlert>
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
              maxLength={MAX_INPUT_LENGTH}
              name="password"
            />
            <ToggleVisible id="pwToggleVisible" state={visibleInputPw} setState={setVisibleInputPw} />
          </InputBoxContainer>
          <InputAlert>
            {handleIsCorrectCheck.pw() ? null : '비밀번호는 영문,숫자,특수기호 조합 8-16자 여야합니다.'}
          </InputAlert>
          <InputBoxContainer>
            <InputBox
              type={visibleInputPwCheck ? 'text' : 'password'}
              placeholder="비밀번호 재입력"
              onChange={onPwCheckChange}
              value={pwCheckValue}
              isCorrect={handleIsCorrectCheck.pwCheck()}
              maxLength={MAX_INPUT_LENGTH}
            />
            <ToggleVisible id="pwCheckToggleVisible" state={visibleInputPwCheck} setState={setVisibleInputPwCheck} />
          </InputBoxContainer>
          <InputAlert>{handleIsCorrectCheck.pwCheck() ? null : '비밀번호가 일치하지 않습니다.'}</InputAlert>
        </InputContainer>
        <InputContainer>
          <InputTitle>닉네임</InputTitle>
          <InputBox
            type="text"
            placeholder="닉네임을 입력하세요"
            onChange={onNickChange}
            value={nickValue}
            isCorrect={handleIsCorrectCheck.nick()}
            maxLength={MAX_INPUT_LENGTH}
            name="nicknameInput"
          />
        </InputContainer>
        <Button
          type="button"
          value="회원가입"
          data-testid="signup"
          onClick={handleSignup}
          disabled={
            !nickValue ||
            !isPwCorrectInput ||
            !isPwCheckCorrectInput ||
            !isEmailCorrectInput ||
            !(pwValue === pwCheckValue)
          }
        />
      </Modal>
    </ModalContainer>
  );
};

export default SignUp;
