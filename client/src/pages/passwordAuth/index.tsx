import { useEffect } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useMutation } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { resetPassword } from '../../api/auth';
import Logo from '../../components/common/logo';
import ToggleVisible from '../../components/login/ToggleVisible';
import useInput from '../../hooks/useInput';
import useToggle from '../../hooks/useToggle';
import { VERIFICATION } from '../../utils/constants';
import {
  AuthButton,
  AuthInput,
  Container,
  Inner,
  InputAlert,
  InputBox,
  InputContainer,
  LogoBox,
  Title,
  TitleContainer,
} from './Style';

const PasswordAuth = () => {
  const [searchParams, _] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [pwVisible, handlePwVisibleToggle] = useToggle(false);

  const { text: pwValue, onChange: onPwChange, correct: isPwCorrectInput } = useInput('', VERIFICATION.pw);
  const {
    text: pwCheckValue,
    onChange: onPwCheckChange,
    correct: isPwCheckCorrectInput,
  } = useInput('', VERIFICATION.pw);
  const isCorrectCheck = {
    pw: isPwCorrectInput || pwValue === '',
    pwCheck: pwValue === pwCheckValue || pwCheckValue === '',
  };

  const resetPasswordMutation = useMutation(resetPassword);

  const handleResetPasswordHandler = () => {
    if (typeof token === 'string') {
      const body = {
        token,
        password: pwValue,
        passwordConfirmation: pwCheckValue,
      };

      resetPasswordMutation.mutate(body, {
        onSuccess: () => {
          toast.success('비밀번호를 초기화 하였습니다.');
          navigate('/login');
        },
      });
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error('잘못된 접근입니다.');
      navigate('/');
    }
  }, []);

  return (
    <Container>
      <Inner>
        <TitleContainer>
          <LogoBox>
            <Logo type="small" />
          </LogoBox>
          <Title>비밀번호 초기화</Title>
        </TitleContainer>

        <InputContainer>
          <InputBox>
            <AuthInput type={pwVisible ? 'text' : 'password'} onChange={onPwChange} />
            <ToggleVisible id="pwToggleVisible" state={pwVisible} setState={handlePwVisibleToggle} />
          </InputBox>
          <InputAlert isShow={!isCorrectCheck.pw}>비밀번호는 영문,숫자,특수기호 조합 8-16자 여야합니다.</InputAlert>
          <InputBox>
            <AuthInput type={pwVisible ? 'text' : 'password'} onChange={onPwCheckChange} />
            <ToggleVisible id="pwToggleVisible" state={pwVisible} setState={handlePwVisibleToggle} />
          </InputBox>
          <InputAlert isShow={!isCorrectCheck.pwCheck}>비밀번호가 일치하지 않습니다.</InputAlert>
        </InputContainer>

        <AuthButton
          type="button"
          onClick={handleResetPasswordHandler}
          disabled={!isPwCorrectInput || !isPwCheckCorrectInput || !(pwValue === pwCheckValue)}
        >
          비밀번호 초기화
        </AuthButton>
      </Inner>
    </Container>
  );
};

export default PasswordAuth;
