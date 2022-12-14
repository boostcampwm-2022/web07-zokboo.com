import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalContainer from '../../components/login/LoginModal';
import { EmailForm, FindIdContainer, InputBox, SendButton, WhatFindContainer } from './Style';

const FindId = () => {
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [canAuthSubmit, setCanAuthSubmit] = useState<boolean>(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowAuth(true);
  };

  const inputAuthNumberEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCanAuthSubmit(true);
    } else {
      setCanAuthSubmit(false);
    }
  };

  return (
    <ModalContainer title="아이디 찾기">
      <WhatFindContainer>
        <Link className="find-id" to="/find_id">
          아이디 찾기
        </Link>
        <Link className="find-pw" to="/find_pw">
          비밀번호 찾기
        </Link>
      </WhatFindContainer>
      <FindIdContainer>
        <EmailForm onSubmit={sendEmail}>
          <InputBox type="text" name="email" placeholder="이메일" required />
          <SendButton type="submit" value="인증번호 전송" isActived />
        </EmailForm>

        {showAuth && (
          <InputBox type="text" name="auth-number" placeholder="인증번호" onChange={inputAuthNumberEvent} required />
        )}
        {showAuth && <SendButton type="submit" value="확인" isActived={canAuthSubmit} />}
      </FindIdContainer>
    </ModalContainer>
  );
};

export default FindId;
