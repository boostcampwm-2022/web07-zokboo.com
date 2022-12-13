import React, { useState } from 'react';
import ModalContainer from '../../components/login/LoginModal';
import { EmailForm, FindPwContainer, InputBox, SendButton } from './Style';

const FindPw = () => {
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
    <ModalContainer title="비밀번호 찾기">
      {/* <WhatFindContainer>
        <Link className="find-id" to="/find_id">
          아이디 찾기
        </Link>
        <Link className="find-pw" to="/find_pw">
          비밀번호 찾기
        </Link>
      </WhatFindContainer> */}
      <FindPwContainer>
        <InputBox type="text" name="email" placeholder="아이디" required />
        <EmailForm onSubmit={sendEmail}>
          <InputBox type="text" name="email" placeholder="이메일" required />
          <SendButton type="submit" value="인증번호 전송" isActived />
        </EmailForm>
        {showAuth && (
          <InputBox type="text" name="auth-number" placeholder="인증번호" onChange={inputAuthNumberEvent} required />
        )}
        {showAuth && <SendButton type="submit" value="확인" isActived={canAuthSubmit} />}
      </FindPwContainer>
    </ModalContainer>
  );
};

export default FindPw;
