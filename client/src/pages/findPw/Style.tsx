import styled from 'styled-components';
import { colors, device } from '../../styles/theme';

export const ModalContainer = styled.div`
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

  padding: 20px;

  @media screen and (max-width: ${device.mobileWidth}) {
    width: 100%;
    border: none;
    box-shadow: none;
  }
`;

export const Modal = styled.div`
  width: 80%;
`;

export const WhatFindContainer = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
  background: ${colors.gray1};

  padding: 0px;
  margin: 24px 0px;

  font-size: 14px;

  border: 2px solid ${colors.gray1};

  border-radius: 8px;

  > * {
    text-decoration: none;
    color: black;
    width: 50%;
    height: 100%;
    line-height: 50px;
    border-radius: 8px;
  }

  .find-pw {
    background: ${colors.white};
  }
`;
export const FindPwContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  > * {
    margin: 4px 0px;
  }
`;

export const EmailForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  > input[type='text'] {
    width: 100%;
    margin-right: 4px;
  }
`;

export const ModalTitle = styled.div``;

export const InputBox = styled.input`
  padding: 12px;

  border: 1px solid #d7d7d7;
  border-radius: 8px;

  :focus {
    outline: none;
    border: 1px solid ${colors.primary};
  }
`;

export const SendButton = styled.input<{ isActived: boolean }>`
  height: 100%;
  background: ${(props) => (props.isActived ? colors.primary : colors.secondary)};
  border: none;
  border-radius: 8px;
  padding: 12px;
  color: ${colors.white};

  :focus {
    opacity: 0.7;
  }
`;
